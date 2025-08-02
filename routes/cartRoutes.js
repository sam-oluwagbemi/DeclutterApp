import {Router} from 'express'
import {createCartItem, getCartItems, editCartItem, deleteCartItems} from "../controllers/cartAPIs/cartController.js"
import {authMiddleware} from "../middlewares/authMiddleware.js"

export const cartRouter = Router()

cartRouter
  .post('/cart/create/:productId/', authMiddleware, createCartItem) //CART
  .get('/cart', authMiddleware, getCartItems) //GET REQ
  .put('/cart/update', authMiddleware, editCartItem) //PUT REQ
  .delete('/cart/items/delete', authMiddleware, deleteCartItems) //DELETE REQ 