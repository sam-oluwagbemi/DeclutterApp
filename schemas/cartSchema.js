import mongoose from "mongoose"

export const cartItemSchema = new mongoose.Schema(
  {
  productId: {type:mongoose.Schema.Types.ObjectId, ref: 'Product'},
  quantity: {type: Number, required: true, default: 1},
  totalItemPrice: {type: Number, required: true},
  price: {type: Number}
  }
)

export const cartSchema = new mongoose.Schema(
  {
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true},
  products: [cartItemSchema],
  totalCartPrice: {type: Number, required: true}
  }, 

  {timestamps: true}
)

export const Cart = mongoose.model("cart", cartSchema)