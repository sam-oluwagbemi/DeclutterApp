import {User} from "../../schemas/userSchema.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import { getToken } from "../../jwt/genToken.js"

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
  const compared = await bcrypt.compare(password, user.password)
  if (!compared) {
    res.status(401).json({message: "Email or password is incorrect"})
    return
  }

  const token = getToken(user._id)
  
  return res
    .cookie('token', token, {httpOnly: true, sameSite: 'strict'})
    .status(200)
    .json({message: `Login successful, proceed to create a Product listing`})

  } catch (error) {
  res.status(500).json(error)
  }
  }
}