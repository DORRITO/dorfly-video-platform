import express from 'express'
import { authMiddelware } from '../middlewares/auth.middleware.ts'
import { toggleFollow } from '../controllers/follow.controller.ts'
const router = express.Router()

router.post('/toggle', authMiddelware, toggleFollow)

export default router