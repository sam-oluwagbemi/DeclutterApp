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

export const removeFromCart = async (req, res) => {
  const userId = req.user._id
  const {productId} = req.params

  try{
    const cart = await Cart.findOne({userId})
    if (!cart) {
      res.status(400).json({message: "cart not found"})
      return
    }

    const updatedProducts = cart.products.filter(
      (item) => item.productId.toString() !==productId
    )

    if (updatedProducts.length === cart.products.length) {
      res.status(404).json({message: "product not found in cart"})
      return
    }

    cart.products = updatedProducts

    cart.totalCartPrice = cart.products.reduce(
      (total, item) => total + item.price * item.quantity, 0
    )

    await cart.save()
    res.status(200).json({message: "product removed successfully", cart})
    console.log(cart)
  } catch (error) {
    res.status(500).json({message: "server error"})
    console.log(error)
  }
}