import type { Request, Response } from 'express'
import { sendError, sendSuccess } from '../utils/apiResponse.ts'
import { followUserService, getFollowsCountService, getFollowService, unfollowUserService } from '../services/follow.service.ts'
import { findUserIdService } from '../services/profile.service.ts'

export const toggleFollow = async (req: Request, res: Response) => {
    try{
        const { followingId } = req.body
        const followerId = req.userId as string

        const follow = await getFollowService(followerId, followingId)

        if(!follow){
            await followUserService(followerId, followingId)
            const following = await findUserIdService(followingId)
            return sendSuccess(res, "Подписка оформлена", 200, { user: following })
        } else {
            await unfollowUserService(followerId, followingId)
            const following = await findUserIdService(followingId)
            return sendSuccess(res, "Отписка оформлена", 200, { user: following })
        }

    } catch(e){
        console.log(e)
        return sendError(res, "Произошла ошибка", 500)
    }
}

export const checkFollow = async (req: Request, res: Response) => {
    try{
        const { followingId } = req.query
        const followerId = req.userId as string

        if(!followingId){
            return sendError(res, "ID не был предоставлен", 400)
        }

        const follow = await getFollowService(followerId, followerId)

        return sendSuccess(res, "Статус подписки получен", 200, { isFollowing: !!follow })

    } catch(e){
        console.log(e)
        return sendError(res, "Произошла ошибка", 500)
    }
}