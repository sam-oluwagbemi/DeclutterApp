import Product from "../../schemas/productSchema"

export const editProduct = async (req, res) => {
  const {id} = req.params
  const {productName, price, condition, size, colour} = req.body
  const reqId = req.user._id
  
  try {
    const product = await Product.findOne({_id: id, userId: reqId})
    if (!product) {
      res.status(400).json({message: "Product not found"})
      return
    }
    product.productName = productName ?? product.productName
    product.price = price ?? product.price
    product.condition = condition ?? product.condition
    product.size = size ?? product.size
    product.colour = colour ?? product.colour

    await product.save()

    //ALTERNATE METHOD
    // await product.findByIdAndUpdate(id, {
    //   $set: {
    //     'productName': productName, 
    //     'price': price, 
    //     'condition': condition, 
    //     'size': size, 
    //     'colour': colour
    //   }
    // }, {new: true})

    res.status(200).json({message: "Product updated sucessfully!"})
  } 
  catch (error) {
    res.send(500).json(error)
  }
}