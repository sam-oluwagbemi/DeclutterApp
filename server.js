const express = require ('express')
const connectdb = require("./dbconnect/mongodb")
const userRouter = require("./routes/userRoutes")
const authRouter = require("./routes/authRoutes")
const cookieparser = require('cookie-parser')
const productRouter = require('./routes/productRoutes')
require('dotenv').config()

connectdb()

const app = express()
app.use('/api', userRouter)
app.use('/api', authRouter)
app.use('/api', productRouter)
app.use(cookieparser())

const port = process.env.PORT 

app.listen(port, console.log(`Server is listening on ${port}`));
