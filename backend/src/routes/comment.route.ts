import express from 'express'
import { authMiddelware } from '../middlewares/auth.middleware.ts'
import { addComment, deleteComment, getCommentsForVideo } from '../controllers/comment.controller.ts'
const router = express.Router()

router.post('/add', authMiddelware, addComment)
router.get('/video', getCommentsForVideo)
router.delete('/delete', authMiddelware ,deleteComment)

export default router