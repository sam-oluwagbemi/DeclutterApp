import { User } from '../../schemas/userSchema.js'
import bcrypt from "bcrypt"

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
    
    const salt = bcrypt.genSaltSync(10) //ENCRYPT PASSWORD
    const hashedPassword = bcrypt.hashSync(password, salt)

    if (email === 'sam@gmail.com' || email === 'name@email.com') {
      const newUser = new User ({...req.body, password: hashedPassword, admin: true})
      await newUser.save()
    }
    
    const newUser = new User({...req.body, password:hashedPassword})
    await newUser.save()
    res.status(201).json({message: "New User created Successfully"})
  } catch (error) {
    res.status(500).json(error)
  }
}
