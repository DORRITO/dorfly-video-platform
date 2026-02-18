import prisma from "../db/client.ts";

export const findUserNicknameService = async (nickname: string) => {
    return prisma.user.findUnique({
        where: {
            nickname: nickname
        },
        select: {
            id: true,
            nickname: true,
            avatar: true,
            description: true,
            created_at: true,
            followers: true,
            following: true,
            role: true
        }
    })
}

export const findUserIdService = async (userId: string) => {
    return prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            id: true,
            nickname: true,
            avatar: true,
            description: true,
            created_at: true,
            followers: true,
            following: true,
            role: true
        }
    })
}

export const updateUserService = async (userId: string, updates: object) => {
    return prisma.user.update({
        where: {
            id: userId
        },
        data: updates,
        select: {
            id: true,
            nickname: true,
            avatar: true,
            description: true,
            created_at: true,
            followers: true,
            following: true,
            role: true
        }
    })
}