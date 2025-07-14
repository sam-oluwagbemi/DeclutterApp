const Router = require('router')
const {createProduct, getAllProducts, getAProduct, editProduct, deleteProduct, getByqueryParams} = require("../controllers/ProductController")
const authMiddleware = require('../middlewares/authMiddleware')

const productRouter = Router()

productRouter
  .post('/product/create', authMiddleware, createProduct) //POST REQ
  .get('/products', getAllProducts) //GET REQ
  .get('/product/:id', getAProduct) //GET REQ
  .get('/productByQuery', getByqueryParams)
  .put('/product/edit', editProduct) //PUT REQ
  .delete('/product/delete', deleteProduct) //DELETE REQ 

module.exports = productRouter