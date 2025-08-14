import { User } from '../../schemas/userSchema.js'
import bcrypt from "bcrypt"
import {generateOTP} from '../../utils/generateOTP.js'
import {sendMail} from '../../utils/sendMail.js'


export const createUser = async (req, res) => {
  const {userName, email, password} = req.body //Request from the body
  if (!userName || !email || !password) {
    res.status(400).json({message: "Please provide all fields"})
    return
  }
  try {
    const user = await User.findOne({email})
    if (user) {
      res.status(400).json({message:"User already exists"})
      return
    }
    
    //generate OTP
    const {otp, otpExpires} = generateOTP()

    //encrypt user password
    const salt = bcrypt.genSaltSync(10) //ENCRYPT PASSWORD
    const hashedPassword = bcrypt.hashSync(password, salt)

    //save admin
    if (email === 'samoluwagbemi22@gmail.com' || email === 'name@email.com') {
      const newUser = new User ({...req.body, password: hashedPassword, admin: true})
      await newUser.save()
    }
    
    //save new user
    const newUser = new User({
      ...req.body, 
      password:hashedPassword,
      otp,
      otpExpires
    })
    await newUser.save()

    //send email to new user
    try {
    const mailObj = {
      mailFrom: `Declutter ${process.env.EMAIL_USER}`,
      mailTo: email,
      subject: 'Welcome to Declutter App',
      body: `
        <p>Welcome to the Declutter, <strong>${userName}</Strong> <p>
        <p>Before you login, we need to verify your account.</p>
        <p>Kindly make use of the otp below to verify your account</p>
        <h1>${otp}</h1>
        `
    }
    const info = await sendMail (mailObj)

  } catch (error) {
    console.log(error)
  }

    res.status(201).json({message: "New User created Successfully"})
  } catch (error) {
    res.status(500).json(error)
  }
}
