import Router from 'router'
import {login} from "../controllers/authAPIs/authController.js"

export const authRouter = Router()
authRouter
  .post('/user/login', login) //POST REQ