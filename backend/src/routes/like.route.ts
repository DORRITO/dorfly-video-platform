import express from 'express'
import { authMiddelware } from '../middlewares/auth.middleware.ts'
import { checkLike, toggleLike } from '../controllers/like.controller.ts'
const router = express.Router()

router.post('/toggle', authMiddelware, toggleLike)
router.get('/', authMiddelware, checkLike)

export default router