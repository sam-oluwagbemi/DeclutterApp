import jwt from "jsonwebtoken"
import { User } from "../schemas/userSchema.js" 

export const authMiddleware = async (req, res, next) => {
  const accessToken = req.cookies.accessToken
  const jwtSecret = process.env.JWT_SECRET

  if (!accessToken) {
    return res.status(401).json({message: "Please login"})
  } 
  try {
    const tokenWithSecret = jwt.verify(accessToken, jwtSecret)
    if (!tokenWithSecret) {
      return res.status(401).json({message: "invalid token"})
    }
  const user = await User.findbyId(tokenWithSecret.id).select("-password")
  if (!user) {
    return res.status(401).json({message: "invalid id"})
  }
  req.user = user
  next()
  }
  catch (error) {
    return res.status(500).json(error)
  }
}