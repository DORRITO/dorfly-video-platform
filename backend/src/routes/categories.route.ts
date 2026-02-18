import express from 'express'
import { authMiddelware } from '../middlewares/auth.middleware.ts'
import { checkRole } from '../middlewares/checkRole.middelware.ts'
import { createCategory, getAllCategories } from '../controllers/categories.controller.ts'
import { uploadCategoryPreview } from '../utils/multer.ts'
const router = express.Router()

router.post('/create', authMiddelware, checkRole(['ADMIN']), uploadCategoryPreview.single('preview'), createCategory)
router.get('/all', getAllCategories)

export default router