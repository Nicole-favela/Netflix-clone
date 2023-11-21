import express from 'express'

import cors from 'cors'
import * as dotenv from 'dotenv'

import bodyParser from 'body-parser'
import connect from './db/mongodb.js'


import MovieRoutes from './routes/movielistRoutes.js'
import AuthRoutes from './routes/userAuthRoutes.js'
import ContentRoutes from './routes/contentRoutes.js'
import UserRoute from './routes/userRoute.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use("/movie-list", MovieRoutes)
app.use("/auth", AuthRoutes)
app.use("/content", ContentRoutes)
app.use("/user", UserRoute)

await connect()

app.listen(3001)