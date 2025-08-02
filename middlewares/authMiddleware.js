import jwt from "jsonwebtoken"
import { User } from "../schemas/userSchema.js" 

export const authMiddleware = async (req, res, next) => {
  const accessToken = req.cookies.token
  const jwtSecret = process.env.JWT_SECRET

  if (!accessToken) {
    return res.status(401).json({message: "Please login"})
  } 

  try {
    const tokenWithSecret = jwt.verify(accessToken, jwtSecret)
    if (!tokenWithSecret) {
      return res.status(401).json({message: "invalid token"})
    }

  const verifiedUser = await User.findById(tokenWithSecret.id).select("-password")
  if (!verifiedUser) {
    return res.status(401).json({message: "invalid id"})
  }
  req.user = verifiedUser
  next()
  }

  catch (error) {
    return res.status(500).json(error)
  }
}