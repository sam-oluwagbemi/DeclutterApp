import mongoose from 'mongoose'

export const productSchema = new mongoose.Schema(
  {
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},  
    productName: {type: String, required: true},
    price: {type: Number, required: true},    
    condition: {type: String, required: true},
    size: {type: String, required: true},
    colour: {type: String, required: true},
    imgUrl: {type: String}
  },
  {timestamps: true});

export const Product = mongoose.model("Product", productSchema)