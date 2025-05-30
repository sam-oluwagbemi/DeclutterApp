const User = require("../schemas/userSchema")

const createUser = async (req, res) => {
  const {userName, email, password} = req.body //Request from the body
  if (!userName || !email || !password) {
    res.send(400).json({message: "Please provide all fields"})
    return
  }
  try {
    const user = await User.findOne({email})
    if (user) {
      res.send(400).json({message:"User already exists"})
      return
    }
    const newUser = new User(req.body)
    await newUser.save()
    res.status(201).json({message: "New User created Successfully"})
  } catch (error) {
    res.status(500).json(error)
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json(error)
  }
}

const getAUser = async (req, res) => {
  const {id} = req.params
  try {
    const users = await User.findById(id)
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json(error)
  }
}

const getByqueryParams = async (req, res) => {
  const {userName, email} = req.query
  try {
    const user = await User.find({userName, email})
  } catch (error) {
    res.status(500).json(error)
  }
}

const editUser = async (req, res) => {
  const {id} = req.params
  const {userName, email, password} = req.body
  try {
    const user = await User.findByIdAndUpdate(id, req.body)
    res.status(200).json({message: "User updated sucessfully!"})
  } catch (error) {
    res.send(500).json(error)
  }
}

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(id)
    res.status(200).json({message: "User deleted successfully!"})
  } catch (error) {
    res.send(500).json(error)
  }
}

module.exports = {
  createUser, 
  getAllUsers,
  getAUser,
  editUser, 
  deleteUser}