import { User } from "../../schemas/userSchema.js";
import { sendMail } from "../../utils/sendMail.js";

export const verifyOTP = async (req, res) => {
  const {otp, email} = req.body

  try{
    const user = await User.findOne({email})
    if(!user) {
      res.status(400).json({message: "User not found, please create an account to continue"})
      return
    }
    if (user.verified)
      return res.status(400).json({message: "User is already verified"})
    if (user.otp !==otp)
      return res.status(400).json({message: "OTP is incorrect"})
    if (user.otpExpires < Date.now())
      return res.status(400).json({message: "OTP is expired"})

    //verify OTP
    user.otp = undefined
    user.otpExpires = undefined
    user.verified = true

    await user.save()
    await  sendMail({
      mailFrom: `Declutter ${process.env.EMAIL_USER}`,
      mailTo: email,
      subject: 'Account Verification Successful',
      body: `
      <p> Dear ${user.userName}, your account has been verified successfully. </p>
      <p> You may login and post your items for sale </p>
      `
    })
    
    res.status(200).json({message: "OTP is verified, please login"})
  } catch (error) {
    res.status(500).json(error)
  }
}