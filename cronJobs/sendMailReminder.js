import { scheduleCron } from "../utils/cron.js";
import {User} from "../schemas/userSchema.js";
import { sendMail } from "../utils/sendMail.js";

export const sendMailReminder = async () => {
  scheduleCron ('0 0 * * *', async () => {
    console.log('cron jobs sending reminder mails')
    const last12Hours = new Date(Date.now() - 12 * 60 * 60 * 1000)
    try {
      const unverifiedUsers = await User.find({
        verified: false,
        createdAt: {$lt: last12Hours}
      })
      console.log(`found ${unverifiedUsers.length} unverified users`)
      await Promise.all(
        unverifiedUsers.map(user => {
          const mailObj = {
          mailFrom: `Declutter ${process.env.EMAIL_USER}`,
          mailTo: user.email,
          subject: `Verify your account`,
          body: `
          <h2>Verify your account</h2>
          <p>Dear ${user.userName}, kindly verify your account by clicking on the link below.</p>
          <a href = "http://localhost:3000/api/auth/verify/${user.otp}">Verify</a>
          <p>Please note that your account will be deleted if not verified in 12hours</p>
          `
        }
        return sendMail(mailObj)
        })
      ) 
      console.log("All reminder emails sent successfully")
    } catch (error) {
      console.log(error)
    }
  })
}