const Product = require("../schemas/productSchema")

const createProduct = async (req, res) => {
  const {productName, price, condition, size, colour} = req.body 
  const {id} = req.user
  if (!productName || !price || !condition || !size ||!colour) {
    res.status(400).json({message: "Please provide all fields"})
    return
  }
  try {
    const newProduct = new Product({...req.body, userId: req.user._id})
    await newProduct.save()
    res.status(201).json({message: "New Product created Successfully"})
  } catch (error) {
    res.status(500).json(error)
  }
}

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json(error)
  }
}

const getAProduct = async (req, res) => {
  const {id} = req.params
  try {
    const product = await Product.findById(id)
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json(error)
  }
}

const getByqueryParams = async (req, res) => {
  const {productName, price, condition, size, colour} = req.query
  try {
    const product = await Product.find({productName, price, condition, size, colour})
  } catch (error) {
    res.status(200).json(error)
  }
}

const editProduct = async (req, res) => {
  const {id} = req.params
  const {productName, price, condition, size, colour} = req.body
  try {
    const product = await Product.findByIdAndUpdate(id, req.body)
    res.status(200).json({message: "Product updated sucessfully!"})
  } catch (error) {
    res.send(500).json(error)
  }
}

const deleteProduct = async (req, res) => {
  const {id} = req.params
  try {
    const product = await Product.findByIdAndDelete(id)
    res.status(200).json({message: "User deleted successfully!"})
  } catch (error) {
    res.send(500).json(error)
  }
}

module.exports = {
  createProduct,
  getAllProducts, 
  getAProduct, 
  editProduct, 
  deleteProduct, 
  getByqueryParams
};