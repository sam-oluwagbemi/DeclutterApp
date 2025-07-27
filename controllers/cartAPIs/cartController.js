import Cart from "../../schemas/cartSchema"
import Product from "../../schemas/productSchema"

export const createCartItem = async (req, res) => {
  const userId = req.user._id
  const {ProductId} = req.param

  try {
     //check for product in the collection
    const product = await Product.findById(ProductId)
    if(!product) {
      res.status(400).json({message: "Product not found"})
      return
    }
    //check if the user has a cart
    const cart = await Cart.findOne({userId: userId})
    if (!cart) {
      cart = new Cart({userId: user._id, products: [{productId: ProductId, quantity: 1, price: product.price}]})
    } else {
      const existingCartItem = cart.products.find(item => item.ProductId === ProductId.toString() === productId)
    
    //update quantity of cart items
    if (existingCartItem) {
        existingCartItem.quantity += 1
    } else {
      cart.products.push({
        productId: productId,
        quantity: 1,
        price: product.price
      })
    }

  //update totalItemPrice of each member of the cart array
  cart.products.forEach(item => {
    item.totalItemPrice = item.price * item.quantity
  })

  //update the totalcartPrice of the cart
cart.totalCartPrice = cart.products.reduce((sum, item) => sum + item.totalItemPrice, 0)

  //save the cart (either existing ot newly created cart)
  await cart.save()
  await cart.populate('products.productId')
  res.status(201).json(cart)
  } catch (error) {
    console.log(error)
  }
  }
}

//UPDATE CART ITEM
export const editCartItem = async (req, res) => {
  const {productId, type} = req.body //types can be "increase" or "decrease"
  if (!productId || !type) {
    res.status(400).json({message: "Please provide all fields"})
    return
  }
  userId = req.user._id
  try {
    //check for the user's cart
    const cart = await Cart.findOne({userId: userid})
    if (!cart) {
      res.status(400).json({message: "Cart not found"})
      return
    }
    //check for the specific item in the products array
    const existingCartItem = cart.products.find(item => item.ProductId.toString() === productId)
    if (type === "increase") {
      existingCartItem.quantity += 1
    } else if (type === "decrease") {
      existingCartItem.quantity -=1
    } else {
      res.status(400).json({message: "type can either increase or decrease"})
      return
    }
    //update the totalCartPrice of the cart
    cart.totalCartPrice = cart.products.reduce((sum, item) => sum +item.totalItemPrice, o)   
    //save the cart(both existing or newly created cart)
    await cart.save()
    await cart.populate('products.productId')
    res.status(200).json(cart)
  } catch (error){
    console.log(error)
  }
}

//GET CART ITEMS
export const getCartItems = async (req, res) => {
  try {
    const cart = await Cart.findOne({userId: req.user._id})
    if (!cart) {
      res.status(400).json({message: Cart not found})
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