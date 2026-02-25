import type { Request, Response } from 'express'
import { sendError, sendSuccess } from '../utils/apiResponse.ts'
import { createLikeService, deleteLikeService, findLikeService, getCountLikesService } from '../services/like.service.ts'

export const toggleLike = async (req: Request, res: Response) => {
    try{
        const {videoId } = req.body
        const userId = req.userId as string

        const getLike = await findLikeService(userId, videoId)

        if(!getLike){
            await createLikeService(userId, videoId)
            const likeCount = await getCountLikesService(videoId)
            return sendSuccess(res, "Лайк поставлен", 200, { likes: likeCount })
        } else {
            await deleteLikeService(userId, videoId)
            const likeCount = await getCountLikesService(videoId)
            return sendSuccess(res, "Лайк убран", 200, { likes: likeCount })
        }
    } catch(e){
        console.log(e)
        return sendError(res, "Произошла ошибка", 500)
    }
}