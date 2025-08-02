import { User } from '../../schemas/userSchema.js'

export const editProfile = async (req, res) => {
  const {id} = req.params
  const reqId = req.user._id
  const {userName, email, password } = req.body
  if (id === reqId) {
    try {
    const user = await User.findByIdAndUpdate(id, req.body, {new: true})
    res.status(200).json({message: "User updated sucessfully!"})
    } 
    catch (error) {
    res.send(500).json(error)
    }
  } else { 
  } 
}

export const editUser = async (req, res) => {
  const {id} = req.params
  const reqId = req.user._id
  const {Country, Number, Address, Bio} = req.body
  if (id === reqId) {
    try {
    const user = await User.findByIdAndUpdate(id, {
      $set: {
      'profile.Country': Country,
      'profile.Number': Number,
      'profile.Address': Address,
      'profile.Bio': Bio,

      }
    }, {new: true})
    res.status(200).json({message: "User updated sucessfully!"})
    } 
    catch (error) {
    res.send(500).json(error)
    }
  } else {
    
  } 
}