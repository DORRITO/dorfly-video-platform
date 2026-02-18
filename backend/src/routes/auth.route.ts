import express from 'express'
import { signUp, login, refresh } from '../controllers/auth.controller.ts'
import { refreshMiddleware } from '../middlewares/refresh.middleware.ts'
const router = express.Router()

router.post('/signup', signUp)
router.post('/login', login)
router.post('/refresh', refreshMiddleware , refresh)

export default router