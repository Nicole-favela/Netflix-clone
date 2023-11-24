import {Router} from 'express'

import { createUser, loginUser } from '../controllers/authController.js';

const router = Router();

router.post('/api/register', createUser)

router.post('/api/login', loginUser)

export default router