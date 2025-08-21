import Router from 'router'
import {login, logoutUser} from "../controllers/authAPIs/authController.js"
import { passwordReset, passwordResetRequest } from '../controllers/authAPIs/passwordReset.js'

export const authRouter = Router()

authRouter
  .post('/user/login', login)
  .post('/user/logout', logoutUser)
  .post('/password/resetRequest', passwordResetRequest)
  .post('/password/new', passwordReset)