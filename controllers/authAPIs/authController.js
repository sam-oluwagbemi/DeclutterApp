import User from "../../schemas/userSchema"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

export const login = async (req, res) => {
const {email, password} = req.body
if (!email || !password) {
  res.status(400).json({message: "Please provide all fields"})
  return
} 
else {

try {
  const user = await User.findOne({email})
  if (!user) {
    res.status(400).json({message: "User not found! Please register first to continue"})
    return
  }
  const compared = await bcrypt.compare(password, User.password)
  if (!compared) {
    res.status(401).json({message: "Email or password is incorrect"})
    return
  }

  const token = getToken(User._id)
  return res
    .cookie('token', token, {httpOnly: true, sameSite: 'strict'})
    .status(200)
    .json({message: "Login Successful, proceed to create a Product listing"})

  } catch (error) {
  res.status(500).json(error)
  }
  }
}