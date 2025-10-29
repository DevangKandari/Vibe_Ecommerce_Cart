const axios = require("axios");
const Product = require("../models/productModel");
const CartItem = require("../models/cartModel");

const mockProducts = [
  {
    name: "T-Shirt",
    price: 25.99,
    imageUrl:
      "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg",
  },
  {
    name: "Wallet",
    price: 49.5,
    imageUrl:
      "https://images.pexels.com/photos/915915/pexels-photo-915915.jpeg",
  },
  {
    name: "Bluetooth Headphones",
    price: 199.99,
    imageUrl:
      "https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg",
  },
  {
    name: "Jeans",
    price: 15.0,
    imageUrl:
      "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg",
  },
  {
    name: "Shoes",
    price: 89.9,
    imageUrl: "https://images.pexels.com/photos/19090/pexels-photo.jpg",
  },
];

const seedDatabase = async () => {
  try {
    await Product.deleteMany({});

    let productsToSave;

    try {
      const response = await axios.get(
        "https://fakestoreapi.com/products?limit=10"
      );
      const apiProducts = response.data;

      if (Array.isArray(apiProducts) && apiProducts.length > 0) {
        productsToSave = apiProducts.map((product) => ({
          name: product.title,
          price: product.price,
          imageUrl: product.image,
        }));
      } else {
        throw new Error("API did not return a valid product array.");
      }
    } catch (apiError) {
      console.error("Fake Store API fetch failed:", apiError.message);
      console.log("Using fallback mock products.");
      productsToSave = mockProducts;
    }

    await Product.insertMany(productsToSave);
  } catch (dbError) {
    console.error("Error finding products:", dbError.message);
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const createProduct = async (req, res) => {
  const { name, price, imageUrl } = req.body;

  if (!name || !price) {
    return res.status(400).json({ msg: "Please provide a name and price" });
  }

  try {
    const newProduct = new Product({
      name,
      price: parseFloat(price),
      imageUrl:
        imageUrl ||
        "https://via.placeholder.com/150/CCCCCC/000000?Text=New+Product",
    });

    const product = await newProduct.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const updateProduct = async (req, res) => {
  const { name, price, imageUrl } = req.body;

  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.imageUrl = imageUrl || product.imageUrl;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    await product.deleteOne();

    await CartItem.deleteMany({ product: req.params.id });

    res.json({ msg: "Product and associated cart items removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  seedDatabase,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
