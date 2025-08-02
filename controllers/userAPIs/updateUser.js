import { User } from '../../schemas/userSchema.js'

export const editUser = async (req, res) => {
  const {id} = req.params
  const reqId = req.user._id
  const {userName, email, password } = req.body
  if (id.toString() === reqId.toString()) {
    try {
    const user = await User.findByIdAndUpdate(id, req.body, {new: true})
    res.status(200).json({message: "User updated sucessfully!"})
    } 
    catch (error) {
    res.status(500).json(error)
    }
  } else { 
     return res.status(401).json({message: "You are not authorized to edit this user"})
  } 
}

export const editProfile = async (req, res) => {
  const {id} = req.params
  const reqId = req.user._id
  const {Country, Number, Address, Bio} = req.body
  if (id.toString() === reqId.toString()) {
    try {
     await User.findByIdAndUpdate(id, {
      $set: {
      'profile.Country': Country,
      'profile.Number': Number,
      'profile.Address': Address,
      'profile.Bio': Bio,
      }
    }, {new: true})
    res.status(200).json({message: "Profile updated sucessfully!"})
    } 
    catch (error) {
    res.status(500).json(error)
    }
  } else {
      return res.status(401).json({ message: "You are not authorized to edit this profile" })
    }
}