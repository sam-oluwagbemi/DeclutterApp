import { User } from "../../schemas/userSchema";

export const verifyOTP = async (req, res) => {
  const {otp, gmail} = req.body

  try{
    const user = await User.findOne({gmail})
    if(!user) {
      res.status(400).json({message: "User not found, please create an account to continue"})
      return
    }
    if (user.verified)
      return res.status(400).json ({message: "OTP is already verified"})
    if (user.otp !==otp)
      return res.status(400).json ({message: "OTP is incorrect"})
    if (user.otpExpires < Date.now())
      return res.status({message: "OTP is expired"})

    //verify OTP
    user.otp = undefined
    user.otpExpires = undefined
    user.verified = true

    await user.save()
    res.status(200).json({message: "OTP is verified, please login"})
  } catch (error) {
    res.status(500).json(error)
  }
}