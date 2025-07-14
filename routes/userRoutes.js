const Router = require('router')
const {createUser, getAllUsers, getAUser, getByqueryParams, editUser, deleteUser} = require("../controllers/userController")
const authmiddleware = require("../middlewares/authMiddleware")
const userRouter = Router()

userRouter
  .post('/create', createUser) //POST REQ
  .get('/users', authmiddleware, getAllUsers) //GET REQ
  .get('/user/:id', getAUser) //GET REQ
  .get('usersByquery', getByqueryParams) //GET USER QUERY/SEARCH
  .put('/user/update/:id', authmiddleware, editUser) //EDIT/UPDATE USER
  .delete('/delete/:id', authmiddleware, deleteUser) //DELETE REQ 

module.exports = userRouter