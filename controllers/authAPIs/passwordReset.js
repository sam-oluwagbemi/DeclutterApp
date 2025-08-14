import { User } from "../../schemas/userSchema.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { sendMail } from "../../utils/sendMail.js";
import Crypto from 'crypto'

export const passwordResetRequest = async (req, res) => {
  const {email} = req.body

  try {
    const user = await User.findOne({email})
    if (!user) {
      res.status(400).json({message: "User not found, create an account to proceed"})
      return
    }

    const token = Crypto.randomBytes(32).toString('hex')

      user.passwordResetToken = token
      user.passwordResetExpires = Date.now() + 20 * 60 * 1000
      await user.save()

      await sendMail({
        mailFrom: `Declutter ${process.env.EMAIL_USER}`,
        mailTo: email,
        subject: 'Reset your Password',
        body: `
        <p> Dear ${user.userName}, kindly follow the link below to create a new password</p>
        <a href="https://localhost:6000/password/reset/${token}">Reset Password</a>
        `
      })
    res.status(200).json({message: 'Use the link sent to your mail to create a new password'})
  } catch (error) {
    console.log(error)
  }
}

export const passwordReset = async (req, res) => {
  const {token, newPassword} = req.body

  try {
    const user = await User.findOne({passwordResetToken: token, passwordResetExpires: {$gt: Date.now()}})
    if (!user) 
      return res.status(400).json({message: 'password reset link is invalid or expired'})

    user.password = bcrypt.hashSync(newPassword, 10)
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined

    await user.save()

     await sendMail({
        mailFrom: `Declutter ${process.env.EMAIL_USER}`,
        mailTo: user.email,
        subject: 'New Password Created Successfully',
        body: `
        <p> Dear ${user.userName}, your new password has been created. Proceed to login</p>
        `
      })

    res.status(200).json({message: 'New Password created successfully'})
  } catch (error) {
    console.log(error)
  }
}