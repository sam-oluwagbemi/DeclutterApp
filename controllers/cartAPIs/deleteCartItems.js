import {Cart} from "../../schemas/cartSchema.js"
import {Product} from "../../schemas/productSchema.js"

export const deleteCartItems = async (req, res) => {
  const userId = req.user._id
  try {
    const cart = await Cart.findOne({userId})
    if (!cart) {
     res.satus(400).json ({message: "Cart not found!"})
     return 
     }
     cart.products = []
     cart.totalCartPrice = 0
     await cart.save()
     res.status(200).json({message: "Cart deleted successfully"})
  } catch (error) {
    console.log(error)
  }
}