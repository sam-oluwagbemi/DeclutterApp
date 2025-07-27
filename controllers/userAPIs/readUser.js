import User from "../schemas/userSchema"

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getAUser = async (req, res) => {
  const {id} = req.params
  try {
    const user = await User.findById(id)
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getByqueryParams = async (req, res) => {
  const {userName, email} = req.query
  const filter = {}

  if (userName) filter.userName = userName
  if (email) filter.email = email

  try {
    const user = await User.find(filter)
  } catch (error) {
    res.status(500).json(error)
  }
}
