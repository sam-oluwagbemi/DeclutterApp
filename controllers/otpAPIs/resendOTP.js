import { User } from "../../schemas/userSchema";
import { generateOTP, sendMail } from "../../utils/sendMail";

export const resendOTP = async (req, res) => {
  const {gmail} = req.body
  try {
    const user = await User.findOne({gmail})
    const {otp, otpExpires} = generateOTP()
    const time = Date.now()

    if (!user) {
      res.status(400).json({message: "User not found, please create an account to continue"})
      return
    }

    if (user.isVerified)
      return res.status(400).json({message: "OTP is already verified"})
    if (time - user.lastOtpSentAt < 2 * 60 * 1000)
      return res.status(400).json({message: "wait for 2 minutes before resending OTP"})

    user.otp = otp
    user.otpExpires = otpExpires
    user.lastOtpSentAt = time
    await user.save()

  await  sendMail({
    mailFrom: `${process.env.EMAIL_USER}`,
    mailTo: gmail,
    subject: 'Verify OTP',
    body: `
    <p> Here is your OTP ${otp}, proceed to verify </p>
    `
  })
  res.status(200).json({message: "OTP is resent successfully"})
  } catch (error) {
    console.log(error)
  }  
}