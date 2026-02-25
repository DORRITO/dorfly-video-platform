import prisma from "../db/client.ts"

export const findLikeService = async (userId: string, videoId: string) => {
    return await prisma.like.findUnique({
        where: {
            userId_videoId: {
                userId: userId,
                videoId: videoId
            }
        }
    })
}

export const createLikeService = async (userId: string, videoId: string) => {
    return await prisma.like.create({
        data: {
            userId: userId,
            videoId: videoId
        }
    })
}

export const deleteLikeService = async (userId: string, videoId: string) => {
    return await prisma.like.delete({
        where: {
            userId_videoId: {
                userId: userId,
                videoId: videoId
            }
        }
    })
}

export const getCountLikesService = async (videoId: string) => {
    return await prisma.like.count({
        where: { videoId: videoId }
    })
}