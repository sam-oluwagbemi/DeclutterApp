import Router from 'router'
import {createProduct, getuserProducts, getAllProducts, getAProduct, editProduct, deleteProduct, getByqueryParams} from "../controllers/productAPIs/barrel.js"
import {authMiddleware} from "../middlewares/authMiddleware.js"

export const productRouter = Router()

productRouter
  .post('/product/create', authMiddleware, createProduct) //POST REQ
  .get('/products/productByQuery', getByqueryParams)
  .get('/products/:userId', getuserProducts) //GET REQ
  .get('/products', getAllProducts) //GET REQ
  .get('/product/:id', getAProduct) //GET REQ
  .put('/product/update/:id', authMiddleware, editProduct) //PUT REQ
  .delete('/product/delete/:id', authMiddleware, deleteProduct) //DELETE REQ 