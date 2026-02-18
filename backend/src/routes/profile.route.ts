import express from 'express'
import { getUserForNickname, updateProfile } from '../controllers/profile.controller.ts'
import { authMiddelware } from '../middlewares/auth.middleware.ts'
const router = express.Router()

router.get('/:nickname', getUserForNickname)
router.put('/update', authMiddelware, updateProfile)

export default router