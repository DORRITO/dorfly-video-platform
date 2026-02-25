import express from 'express'
import { authMiddelware } from '../middlewares/auth.middleware.ts'
import { toggleLike } from '../controllers/like.controller.ts'
const router = express.Router()

router.post('/toggle', authMiddelware, toggleLike)

export default router