import mongoose from 'mongoose'

export const productSchema = new mongoose.Schema(
  {
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},  
    name: {type: String, required: true},
    price: {type: Number, required: true},    
    condition: {type: String, required: true},
    size: {type: String, required: true},
    colour: {type: String, required: true},
    imgUrl: {type: String, required: true}
  },
  {timestamps: true});

export const Product = mongoose.model("product", productSchema)