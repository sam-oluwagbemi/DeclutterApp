const express = require ('express')
const connectdb = require("./dbconnect/mongodb")
const userRouter = require("./routes/userRoutes")
require('dotenv').config()

connectdb()

const app = express()
app.use('/api', userRouter)

const port = process.env.PORT 

app.listen(port, console.log(`Server is listening on ${port}`));
