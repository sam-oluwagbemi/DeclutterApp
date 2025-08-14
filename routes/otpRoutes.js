import {Router} from 'express'
import { verifyOTP } from '../controllers/otpAPIs/verifyOTP.js'
import { resendOTP } from '../controllers/otpAPIs/resendOTP.js'
export const otpRouter = Router()

otpRouter
  .post('/otp/verify', verifyOTP)
  .post('/otp/resend', resendOTP)