import type { Request, Response } from 'express'
import { sendError, sendSuccess } from '../utils/apiResponse.ts'
import { createLikeService, deleteLikeService, findLikeService, getCountLikesService } from '../services/like.service.ts'
import { getVideoByIdService } from '../services/video.service.ts'

export const toggleLike = async (req: Request, res: Response) => {
    try{
        const {videoId } = req.body
        const userId = req.userId as string

        const getLike = await findLikeService(userId, videoId)

        if(!getLike){
            await createLikeService(userId, videoId)
            const video = await getVideoByIdService(videoId)
            return sendSuccess(res, "Лайк поставлен", 200, { video: video })
        } else {
            await deleteLikeService(userId, videoId)
            const video = await getVideoByIdService(videoId)
            return sendSuccess(res, "Лайк убран", 200, { video: video })
        }
    } catch(e){
        console.log(e)
        return sendError(res, "Произошла ошибка", 500)
    }
}

export const checkLike = async (req: Request, res: Response) => {
    try{
        const { videoId } = req.query
        const userId = req.userId as string

        if(!videoId){
            return sendError(res, "ID не был предоставлен", 400)
        }

        const like = await findLikeService(userId, videoId)

        return sendSuccess(res, "Статус подписки получен", 200, { isLike: !!like })

    } catch(e){
        console.log(e)
        return sendError(res, "Произошла ошибка", 500)
    }
}