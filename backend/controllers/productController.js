const Product = require("../models/productModel");

const getProducts = async (req, res) => {
  try {
    let products = await Product.find();

    if (products.length === 0) {
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
      products = await Product.insertMany(mockProducts);
    }

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
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcxOacweDULECGAMT9YxpNpVHQ3g6rqxDA_A&s",
    });

    const product = await newProduct.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getProducts,
  createProduct,
};
