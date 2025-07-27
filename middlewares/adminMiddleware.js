import User from "../schemas/userSchema"

export const adminCheck = async (req, res, next) => {
  const user = req.user
  if (user.admin === true) {
    next
  } else {
   res.status(401).json({message: "You are not authorized to access this route"}) 
  }
}