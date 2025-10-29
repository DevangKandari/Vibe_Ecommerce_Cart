const Product = require("../models/productModel");

const getProducts = async (req, res) => {
  try {
    let products = await Product.find();

    if (products.length === 0) {
      const mockProducts = [
        {
          name: "Classic T-Shirt",
          price: 25.99,
          imageUrl:
            "https://via.placeholder.com/150/0000FF/808080?Text=T-Shirt",
        },
        {
          name: "Leather Wallet",
          price: 49.5,
          imageUrl: "https://via.placeholder.com/150/FF0000/FFFFFF?Text=Wallet",
        },
        {
          name: "Bluetooth Headphones",
          price: 199.99,
          imageUrl:
            "https://via.placeholder.com/150/008000/FFFFFF?Text=Headphones",
        },
        {
          name: "Coffee Mug",
          price: 15.0,
          imageUrl: "https://via.placeholder.com/150/FFFF00/000000?Text=Mug",
        },
        {
          name: "Running Shoes",
          price: 89.9,
          imageUrl: "https://via.placeholder.com/150/800080/FFFFFF?Text=Shoes",
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

module.exports = {
  getProducts,
};
