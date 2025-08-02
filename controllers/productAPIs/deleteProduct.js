import {Product} from "../../schemas/productSchema.js"

export const deleteProduct = async (req, res) => {
  const {id} = req.params
  try {
    const product = await Product.findByIdAndDelete(id)
    res.status(200).json({message: "User deleted successfully!"})
  } catch (error) {
    res.send(500).json(error)
  }
}