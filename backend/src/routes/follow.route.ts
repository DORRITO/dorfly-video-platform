import express from 'express'
import { authMiddelware } from '../middlewares/auth.middleware.ts'
import { checkFollow, toggleFollow } from '../controllers/follow.controller.ts'
const router = express.Router()

router.post('/toggle', authMiddelware, toggleFollow),
router.get('/check', authMiddelware, checkFollow)

export default router