import { Router } from 'express'
import { authMiddleware } from '../middleware/authMiddleware'
import { login } from '../controllers/auth.controller';
import { getMe } from '../controllers/auth.controller';

const router = Router()

router.post('/login', login)
router.get('/me', authMiddleware as any, getMe)

export const AuthController = router
