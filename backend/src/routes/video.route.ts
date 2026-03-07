import express from 'express'
import { authMiddelware } from '../middlewares/auth.middleware.ts'
import { uploadVideoData } from '../utils/multer.ts'
import { deleteVideo, getAllVideos, getVideoById, getVideosByCategory, getVideosBySubCategory, getVideosByUser, uploadVideo } from '../controllers/video.controller.ts'
const router = express.Router()

router.post(
    '/upload', 
    authMiddelware, 
    uploadVideoData.fields([
        { name: 'video', maxCount: 1 },  
        { name: 'preview', maxCount: 1 }
    ]), 
    uploadVideo
)
router.get('/all', getAllVideos)
router.get('/video', getVideoById)
router.get('/category', getVideosByCategory)
router.get('/subcategory', getVideosBySubCategory)
router.delete('/delete', authMiddelware, deleteVideo)
router.get('/videos/', getVideosByUser)

export default router