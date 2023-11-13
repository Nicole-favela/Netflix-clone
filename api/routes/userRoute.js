import {Router} from "express"
import User from '../models/usermodel.js'

import jwt from 'jsonwebtoken'
import authenticateToken from '../utils/authenticate.js'
import * as dotenv from 'dotenv'


dotenv.config()

const router= Router();

router.get('/', authenticateToken, async (req,res)=>{
    //authenticate token, and get user from request
    res.json({user: req.user})
})



export default router