import {Router} from 'express'
import { verifyOTP } from '../controllers/otpAPIs/barrel'
import { resendOTP } from '../controllers/otpAPIs/barrel'
export const otpRouter = Router()

otpRouter
  .post('verify', verifyOTP)
  .post('resend', resendOTP)