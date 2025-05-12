import { Router } from 'express'
import { getUserById } from '../controllers/user.controller';
import { createUser } from '../controllers/user.controller';

const router = Router()

router.get('/:id', getUserById)
router.post('/', createUser)

export const UserController = router
