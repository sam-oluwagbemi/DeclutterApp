import {Product} from "../../schemas/productSchema.js"

export const createProduct = async (req, res) => {
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