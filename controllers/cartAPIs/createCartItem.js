import {Cart} from "../../schemas/cartSchema.js"
import {Product} from "../../schemas/productSchema.js"

export const createCartItem = async (req, res) => {
  const {productId} = req.params
  const userId = req.user._id

  try {
     //check for product in the collection
    const product = await Product.findById(productId)
    if(!product) {
      res.status(400).json({message: "Product not found"})
      return
    }

    //check if the user has a cart
    let cart = await Cart.findOne({userId})

    if (!cart) {

      const quantity = 1
      const price = product.price
      const totalItemPrice = price * quantity
      const totalCartPrice = totalItemPrice
      
      cart = new Cart({
          userId, 
          products: [{
              productId: product._id, 
              quantity: 1, 
              price: product.price,
              totalItemPrice: price * quantity
            }],
          totalCartPrice
        })
    } else {
      const existingCartItem = cart.products.find(item => item.productId.toString() === product._id.toString())
      if (existingCartItem) {
        existingCartItem.quantity += 1
      } else {
        cart.products.push({
          productId: product._id,
          quantity: 1,
          price: product.price
        })
      }

 //Recalculate prices
  cart.products.forEach(item => {
    item.totalItemPrice = item.price * item.quantity
  })

  //update the totalcartPrice of the cart
  cart.totalCartPrice = cart.products.reduce((sum, item) => sum + item.totalItemPrice, 0)
  }
  //save the cart (either existing ot newly created cart)
  await cart.save()
  await cart.populate('products.productId')
  res.status(201).json({message: 'Item added to cart'})
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}    