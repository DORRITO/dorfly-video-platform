import prisma from "../db/client.ts"

export const candidateEmail = async (email: string) => {
    return await prisma.user.findUnique({
        where: {
            email: email
        }
    })
}

export const candidateNickname = async (nickname: string) => {
    return await prisma.user.findUnique({
        where: {
            nickname: nickname
        }
    })
}

export const createUser = async (email: string, nickname: string, hashPassword: string) => {
    return await prisma.user.create({
        data: {
            email,
            nickname,
            password_hash: hashPassword
        }
    }) 
}