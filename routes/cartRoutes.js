import {Router} from 'express'
import {createCartItem, getCartItems, editCartItem, deleteCartItems} from "../controllers/cartAPIs/barrel.js"
import {authMiddleware} from "../middlewares/authMiddleware.js"

export const cartRouter = Router()

cartRouter
  .post('/cart/create/:productId', authMiddleware, createCartItem) //CART
  .get('/cart', authMiddleware, getCartItems) //GET REQ
  .put('/cart/update/:cartId', authMiddleware, editCartItem) //PUT REQ
  .delete('/cart/delete/:cartId', authMiddleware, deleteCartItems) //DELETE REQ 