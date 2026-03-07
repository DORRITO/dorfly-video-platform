import express from 'express'
import { signUp, login, refresh, logout } from '../controllers/auth.controller.ts'
import { refreshMiddleware } from '../middlewares/refresh.middleware.ts'
const router = express.Router()

router.post('/signup', signUp)
router.post('/login', login)
router.post('/refresh', refreshMiddleware , refresh)
router.post('/logout', logout)

export default router