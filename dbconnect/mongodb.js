const mongoose = require('mongoose')

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL,)
    console.log("connected to mongoDB")
  } catch (error) {
    console.log(error)
  }
}

module.exports = connectdb