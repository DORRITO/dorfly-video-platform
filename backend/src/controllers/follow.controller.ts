import type { Request, Response } from 'express'
import { sendError, sendSuccess } from '../utils/apiResponse.ts'
import { followUserService, getFollowsCountService, getFollowService, unfollowUserService } from '../services/follow.service.ts'

export const toggleFollow = async (req: Request, res: Response) => {
    try{
        const { followingId } = req.body
        const followerId = req.userId as string

        const follow = await getFollowService(followerId, followingId)

        if(!follow){
            await followUserService(followerId, followingId)
            const followersCount = await getFollowsCountService(followingId)
            return sendSuccess(res, "Подписка оформлена", 200, { followers: followersCount })
        } else {
            await unfollowUserService(followerId, followingId)
            const followersCount = await getFollowsCountService(followingId)
            return sendSuccess(res, "Отписка оформлена", 200, { followers: followersCount })
        }

    } catch(e){
        console.log(e)
        return sendError(res, "Произошла ошибка", 500)
    }
}