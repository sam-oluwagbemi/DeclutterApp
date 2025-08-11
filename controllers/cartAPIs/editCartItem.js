import {Cart} from "../../schemas/cartSchema.js"
import {Product} from "../../schemas/productSchema.js"

export const editCartItem = async (req, res) => {
  const {productId, type} = req.body //types can be "increase" or "decrease"
  const userId = req.user._id

  if (!productId || !type) {
    res.status(400).json({message: "Please provide all fields"})
    return
  }

  try {
    //1. find cart
    const cart = await Cart.findOne({userId})
    if (!cart) {
      res.status(400).json({message: "Cart not found"})
      return
    }
    //2. locate item in cart
    const item = cart.products.find(item => item.productId.toString() === productId)
    if (!item) {
      res.status(404).json({message: "Product not found in cart"})
    }

    //3. Modify quantity or remove item
    if (type === "increase") {
      item.quantity += 1
    } else if (type === "decrease" && item.quantity > 1) {
      item.quantity -=1
    } else {
      res.status(400).json({message: "type can either increase or decrease"})
      return
    }

    //4. update totalItemPrice
    cart.products.forEach(item => {
      item.totalItemPrice = item.price * item.quantity
    })

    //5. update the totalCartPrice of the cart
      cart.totalCartPrice = cart.products.reduce((sum, item) => sum + item.totalItemPrice, 0)   
    
    //6. save the cart(both existing or newly created cart)
    await cart.save()
    await cart.populate('products.productId')

    res.status(200).json(cart)
    } catch (error){
      console.log(error)
    }
}
