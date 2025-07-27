import {Router} from 'express'
import {createCartItem, getCartItems, editCartItem, deleteCartItem} from "../controllers/cartAPIs/cartController"
import authMiddleware from '../middlewares/authMiddleware'

export const cartRouter = Router()

cartRouter
  .post('/cart/create/:productId/:price', authMiddleware, createCartItem) //CART
 
  .get('/products/:userId', getuserProducts) //GET REQ
  .get('/products', getAllProducts) //GET REQ
  .get('/product/:id', getAProduct) //GET REQ
  .get('/productByQuery', getByqueryParams)
  .put('/product/edit', editProduct) //PUT REQ
  .delete('/product/delete', deleteProduct) //DELETE REQ 