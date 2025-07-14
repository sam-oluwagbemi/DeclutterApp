const User = require ("../schemas/userSchema")
const bcrypt = require("bcrypt")

const createUser = async (req, res) => {
  const {userName, email, password} = req.body //Request from the body
  if (!userName || !email || !password) {
    res.status(400).json({message: "Please provide all fields"})
    return
  }
  try {
    const user = await User.findOne({email})
    if (user) {
      res.status(400).json({message:"User already exists"})
      return
    }
    
    //ENCRYPT PASSWORD
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    
    //COMARING INPUTED PASSWORD WITH HASHED PASWSWORD IN DATABASE

    // Admin account creation
    if (email === 'sam@gmail.com' || email === 'name@email.com') {
      const newUser = new User ({...req.body, password: hashedPassword, admin: true})
      await newUser.save()
    }
    
    const newUser = new User({...req.body, password:hashedPassword})
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
  const filter = {}

  if (userName) filter.userName = userName
  if (email) filter.email = email

  try {
    const user = await User.find(filter)
  } catch (error) {
    res.status(500).json(error)
  }
}

const editUser = async (req, res) => {
  const {id} = req.params
  const {userName, email, password} = req.body
  try {
    const user = await User.findByIdAndUpdate(id, req.body, {new: true})
    res.status(200).json({message: "User updated sucessfully!"})
  } catch (error) {
    res.send(500).json(error)
  }
}

const deleteUser = async (req, res) => {
  const {id} = req.params
  try {
    await User.findByIdAndDelete(id)
    res.status(200).json({message: "User deleted successfully!"})
  } catch (error) {
    res.send(500).json(error)
  }
}

module.exports = {
  createUser, 
  getAllUsers,
  getAUser,
  getByqueryParams,
  editUser, 
  deleteUser
}