import nodemailer from 'nodemailer'

export const sendMail = async ({mailFrom, mailTo, subject, body}) => {
    const transporter = nodemailer.createTransport ({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    })

    //send mail
  try {  
    const info = await transporter.sendMail ({
      from: mailFrom,
      to: mailTo,
      subject,
      html: body
    })
    console.log('Email sent')
    return info
  } catch (error) {
    console.log(error)
  }
}