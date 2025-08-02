import {Router} from 'express'
import {createUser, getAUser, getAllUsers, getByqueryParams, editProfile, editUser, deleteUser } from '../controllers/userAPIs/barrel.js'
import {authMiddleware} from "../middlewares/authMiddleware.js"
// import {adminCheck} from '../middlewares/adminMiddleware.js'

export const userRouter = Router()

userRouter
  .post('/user/create', createUser) //POST REQ
  .get('/users', getAllUsers) //GET REQ
  .get('/user/:id', authMiddleware, getAUser) //GET REQ
  .get('/usersByquery', getByqueryParams) //GET USER QUERY/SEARCH
  .put('/profile/update/:id', authMiddleware, editProfile) //EDIT/UPDATE PROFILE
  .put('/user/update/:id', authMiddleware, editUser) //EDIT/UPDATE USER
  // .put('/user/makeAdmin/:id', authMiddleware, adminCheck, makeAdmin) //MAKE ADMIN
  .delete('/user/delete/:id', authMiddleware, deleteUser) //DELETE REQ