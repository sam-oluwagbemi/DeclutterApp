import Router from 'router'
import {login} from "../controllers/authAPIs/authController.js"
import { passwordReset, passwordResetRequest } from '../controllers/authAPIs/passwordReset.js'

export const authRouter = Router()
authRouter
  .post('/user/login', login)
  .post('/password/resetRequest', passwordResetRequest)
  .post('/password/new', passwordReset)