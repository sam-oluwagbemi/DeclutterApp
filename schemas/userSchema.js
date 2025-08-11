import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
    userName: {type: String, required: true, unique: true},    
    email: {type: String, required: true, unique: true},    
    password: {type: String, required: true, unique: true},
    admin: {type: Boolean, default: false},
    ChiefAdmin: {type: Boolean, default: false},  
   
    profile: {
      country: {type: String, required: true},
      number: {type: Number, required: true},
      address: {type: String, required: true},
      bio: {type: String, required: true},
    }, 
    otp: String,
    otpExpires: Date,
    verified: {type: Boolean, default: false},
    lastOtpSentAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
},  {timestamps: true}
)

export const User = mongoose.model("User", userSchema)