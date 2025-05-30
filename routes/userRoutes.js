const Router = require('router')
const {createUser, getAllUsers, getAUser, editUser, deleteUser} = require("../controllers/userController")

const userRouter = Router()

userRouter
  .post('/create', createUser) //POST REQ
  .get('/users', getAllUsers) //GET REQ
  .get('/user/:id', getAUser) //GET REQ
  .put('/edit', editUser) //PUT REQ
  .delete('/delete', deleteUser) //DELETE REQ 

module.exports = userRouter