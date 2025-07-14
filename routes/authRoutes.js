const Router = require('router')
const {login} = require("../controllers/authController")

const authRouter = Router()

authRouter
  .post('/user/login', login) //POST REQ
   

module.exports = authRouter