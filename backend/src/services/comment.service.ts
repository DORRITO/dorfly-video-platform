import prisma from "../db/client.ts"

export const addCommentService = async ( authorId: string, videoId: string, text: string ) => {
    return await prisma.comment.create({
        data: {
            author_id: authorId,
            video_id: videoId,
            text: text
        },
        include: {
            author: {
                select: {
                    nickname: true,
                    avatar: true
                }
            }
        },
    })
}

export const getCommentsForVideoService = async (videoId: string) => {
    return await prisma.comment.findMany({
        where: {
            video_id: videoId
        },
        include: {
            author: {
                select: {
                    nickname: true,
                    avatar: true
                }
            }
        },
        orderBy: {
            created_at: "desc"
        }
    })
}

export const findCommentService = async (commentId: string) => {
    return await prisma.comment.findUnique({
        where: {
            id: commentId
        }
    })
}

export const deleteCommentService = async (commentid: string) => {
    return await prisma.comment.delete({
        where: {
            id: commentid
        }
    })
}