import prisma from "../db/client.ts"

export const getFollowService = async (follower_id: string, following_id: string) => {
    return await prisma.follows.findUnique({
        where: {
            follower_id_following_id: {
                follower_id: follower_id,
                following_id: following_id
            }
        }
    })
}

export const followUserService = async (follower_id: string, following_id: string) => {
    return await prisma.follows.create({
        data: {
            follower_id: follower_id,
            following_id: following_id
        }
    })
}

export const unfollowUserService = async (follower_id: string, following_id: string) => {
    return await prisma.follows.delete({
        where: {
            follower_id_following_id: {
                follower_id: follower_id,
                following_id: following_id
            }
        }
    })
}

export const getFollowsCountService = async (following_id: string) => {
    return await prisma.follows.count({
        where: { following_id: following_id }
    })
}