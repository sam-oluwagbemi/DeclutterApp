import express from 'express'
import cookieParser from 'cookie-parser'
import {userRouter} from "./routes/userRoutes.js"
import {authRouter} from "./routes/authRoutes.js"
import {cartRouter} from "./routes/cartRoutes.js"
import {productRouter} from './routes/productRoutes.js'
import {connectdb} from "./dbconnect/mongodb.js"
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