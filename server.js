import express from 'express'
import connectdb from "./dbconnect/mongodb"
import userRouter from "./routes/userRoutes"
import authRouter from "./routes/authRoutes"
import cartRouter from "./routes/cartRoutes"
import cookieParser from 'cookie-parser'
import productRouter from './routes/productRoutes'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
connectdb()

const app = express()

//MIDDLEWARE
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

//ROUTES
app.use('/api', userRouter)
app.use('/api', authRouter)
app.use('/api', productRouter)
app.use('api', cartRouter)

const port = process.env.PORT 

app.listen(port, console.log(`Server is listening on ${port}`));