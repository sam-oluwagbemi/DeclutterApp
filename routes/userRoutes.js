import {Router} from 'express'
import {createUser, getAUser, getAllUsers, getByqueryParams, editProfile, editUser, makeAdmin, deleteUser } from '../controllers/userAPIs/barrel'
import {authmiddleware} from "../middlewares/authMiddleware"
import {adminCheck} from '../middlewares/adminMiddleware'

export const userRouter = Router()

userRouter
  .post('/create', createUser) //POST REQ
  .get('/users', authmiddleware, getAllUsers) //GET REQ
  .get('/user/:id', getAUser) //GET REQ
  .get('usersByquery', getByqueryParams) //GET USER QUERY/SEARCH
  .put('/profile/update/:id', authmiddleware, editProfile) //EDIT/UPDATE PROFILE
  .put('/user/update/:id', authmiddleware, editUser) //EDIT/UPDATE USER
  .put('/user/makeAdmin/:id', authmiddleware, adminCheck, makeAdmin) //MAKE ADMIN
  .delete('/delete/:id', authmiddleware, deleteUser) //DELETE REQ 