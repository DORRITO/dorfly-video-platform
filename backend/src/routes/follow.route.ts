import express from 'express'
import { authMiddelware } from '../middlewares/auth.middleware.ts'
import { chechFollow, toggleFollow } from '../controllers/follow.controller.ts'
const router = express.Router()

router.post('/toggle', authMiddelware, toggleFollow),
router.get('/check', authMiddelware, chechFollow)

export default router