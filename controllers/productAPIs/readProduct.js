import {Product} from "../../schemas/productSchema.js"

export const getuserProducts = async (req, res) => {
  const {userId} = req.params
  try {
      const products = await Product.find({userId})
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('userId').select("-password")
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getAProduct = async (req, res) => {
  const {id} = req.params
  try {
    const product = await Product.findById(id)
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getByqueryParams = async (req, res) => {
  const {productName, price, condition, size, colour} = req.query
  const filter = {}

  if (productName) filter.productName = productName
  if (price) filter.price = price
  if (condition) filter.condition = condition
  if (size) filter.size = size
  if (colour) filter.colour = colour

  try {
    const product = await Product.find(filter)
    res.status(200).json(product)
  } catch (error) {
    res.status(200).json(error)
  }
}