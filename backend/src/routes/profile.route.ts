import express from 'express'
import { getAuthorizedUser, getUserForNickname, updateProfile } from '../controllers/profile.controller.ts'
import { authMiddelware } from '../middlewares/auth.middleware.ts'
import { uploadAvatar } from '../utils/multer.ts'
const router = express.Router()

router.get('/:nickname', getUserForNickname)
router.put('/update', authMiddelware, uploadAvatar.single('avatar'), updateProfile)
router.get('/', authMiddelware, getAuthorizedUser)

export default router