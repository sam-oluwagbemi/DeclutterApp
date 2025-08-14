import {User} from "../../schemas/userSchema.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import {getToken} from "../../jwt/genToken.js"
import {sendMail} from "../../utils/sendMail.js"

export const login = async (req, res) => {
const {email, password} = req.body

  //send login confirmation email
  const mailObj = {
  mailFrom: `Declutter ${process.env.EMAIL_USER}`,
  mailTo: email,
  subject: 'Login Successful',
  body: `
      <p>You have logged in to your account.<p>
      <p>You can proceed to post your items for sale</p>
      `
  }

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

  if (!user.verified) {
    return res.status(403).json({message: 'Please verify your account before logging in'})
  }

  const compared = await bcrypt.compare(password, user.password)
  if (!compared) {
    res.status(401).json({message: "Email or password is incorrect"})
    return
  }

  const token = getToken(user._id)
  
  //send login confirmation email
  await sendMail (mailObj)

  return res
    .cookie('token', token, {httpOnly: true, sameSite: 'strict'})
    .status(200)
    .json({message: `Login successful, proceed to create a Product listing`})

  } catch (error) {
  res.status(500).json(error)
  }
  }
}