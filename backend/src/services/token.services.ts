import prisma from "../db/client.ts"
import jwt from "jsonwebtoken"

export const generateTokens = async (userId: string) => {
    const accessToken = await jwt.sign({ userId:  userId }, process.env.JWT_SECRET!, { expiresIn: "10m" })
    const refreshToken = await jwt.sign({ userId: userId }, process.env.JWT_SECRET!, { expiresIn: "30d" })

    return { accessToken: accessToken, refreshToken: refreshToken }
}

export const saveToken = async (userId: string, refreshToken: string) => {
    return await prisma.token.upsert({
        where: {
            userId: userId
        },
        update: {
            refreshToken: refreshToken
        },
        create: {
            userId: userId,
            refreshToken: refreshToken
        }
    })
}

