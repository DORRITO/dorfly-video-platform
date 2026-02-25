import type { Request, Response } from 'express'
import { sendError, sendSuccess } from '../utils/apiResponse.ts'
import { getAllVideosService, getVideoByIdService, getVideosByCategoryService, getVideosBySubCategoryService, uploadVideoService } from '../services/video.service.ts'

export const uploadVideo = async (req: Request, res: Response) => {
    try{
        const { title, description, category_id, subcategory_id } = req.body
        const userId = req.userId as string
        const files = req.files as { [fieldname: string]: Express.Multer.File[] }
        const videoFile = files['video'] ? files['video'][0] : null
        const previewFile = files['preview'] ? files['preview'][0] : null 

        if(!videoFile){
            return sendError(res, "Видео желательно загрузить", 400)
        }

        const newVideo = await uploadVideoService(
            title,
            description, 
            category_id, 
            subcategory_id, 
            videoFile, 
            previewFile,
            userId
        )

        return sendSuccess(res, "Видео успешно создано", 200, { video: newVideo })
    } catch(e){
        console.log(e)
        return sendError(res, "Произошла ошибка", 500)
    }
}

export const getAllVideos = async (req: Request, res: Response) => {
    try{
        const allVideos = await getAllVideosService()

        return sendSuccess(res, "Все видео получены", 200, { videos: allVideos })
    } catch(e){
        console.log(e)
        return sendError(res, "Произошла ошибка", 500)
    }
}

export const getVideoById = async(req: Request, res: Response) => {
    try{
        const { videoId } = req.query
        if(!videoId){
            return sendError(res, "video id не передано", 400)
        }

        const video = await getVideoByIdService(videoId as string)

        return sendSuccess(res, "Видео получено", 200, { video: video })
    } catch(e){
        console.log(e)
        return sendError(res, "Произошла ошибка", 500)
    }
}

export const getVideosByCategory = async(req: Request, res: Response) => {
    try{
        const { category_id } = req.query

        const videos = await getVideosByCategoryService(category_id as string)

        return sendSuccess(res, "Все видео получены", 200, { videos: videos })
    } catch(e){
        console.log(e)
        return sendError(res, "Произошла ошибка", 500)
    }
}

export const getVideosBySubCategory = async(req: Request, res: Response) => {
    try{
        const { subcategory_id } = req.query

        const videos = await getVideosBySubCategoryService(subcategory_id as string)

        return sendSuccess(res, "Все видео получены", 200, { videos: videos })
    } catch(e){
        console.log(e) 
        return sendError(res, "Произошла ошибка", 500)
    }
}