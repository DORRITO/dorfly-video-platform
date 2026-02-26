import type { Request, Response } from 'express'
import { sendError, sendSuccess } from '../utils/apiResponse.ts'
import { addCommentService, deleteCommentService, findCommentService, getCommentsForVideoService } from '../services/comment.service.ts'
import { getVideoByIdService } from '../services/video.service.ts'

export const addComment = async (req: Request, res: Response) => {
    try{
        const { videoId, text } = req.body
        const authorId = req.userId as string

        if(!videoId || !text){
            return sendError(res, "Не все данные были предоставлены", 400)
        }

        const video = await getVideoByIdService(videoId)
        if(!video){
            return sendError(res, "Видео не найдено :(", 400)
        }

        const comment = await addCommentService(authorId, videoId, text)
        return sendSuccess(res, "Комментарий добавлен", 200, { comment: comment })
    } catch(e){
        console.log(e)
        return sendError(res, "Произошла ошибка", 500)
    }
}

export const getCommentsForVideo = async(req: Request, res: Response) => {
    try{
        const { videoId } = req.query

        const comments = await getCommentsForVideoService(videoId as string)
        return sendSuccess(res, "Комментарии получены", 200, { comments: comments })
    } catch(e){
        console.log(e)
        return sendError(res, "Произошла ошибка", 500)
    }
}

export const deleteComment = async(req: Request, res: Response) => {
    try{
        const { commentId } = req.body
        const userId = req.userId as string

        const findComment = await findCommentService(commentId)
        if(!findComment){
            return sendError(res, "Комментарий не найден", 400)
        }

        if(userId !== findComment.author_id){
            return sendError(res, "Вы не можете удалить чужой комментарий", 400)
        }

        await deleteCommentService(commentId)
        return sendSuccess(res, "Комментарий удален", 200, { deletedComment: commentId })
    } catch(e){
        console.log(e)
        return sendError(res, "Произошла ошибка", 500)
    }
}