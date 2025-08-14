import {User} from "../../schemas/userSchema.js";
import {sendMail} from "../../utils/sendMail.js";
import { generateOTP } from "../../utils/generateOTP.js";

export const resendOTP = async (req, res) => {
  const {email} = req.body
  try {
    const user = await User.findOne({email})
    const {otp, otpExpires} = generateOTP()
    const time = Date.now()

    if (!user) {
      res.status(400).json({message: "User not found, please create an account to continue"})
      return
    }

    if (user.verified)
      return res.status(400).json({message: "OTP is already verified"})
    if (time - user.lastOtpSentAt < 2 * 60 * 1000)
      return res.status(400).json({message: "wait for 2 minutes before resending OTP"})

    user.otp = otp
    user.otpExpires = otpExpires
    user.lastOtpSentAt = time
    await user.save()

  await  sendMail({
    mailFrom: `Declutter ${process.env.EMAIL_USER}`,
    mailTo: email,
    subject: 'Verify OTP',
    body: `
    <p> Here is your OTP ${otp}, proceed to verify </p>
    `
  })
  res.status(200).json({message: "OTP has been resent successfully"})
  } catch (error) {
    console.log(error)
  }  
}