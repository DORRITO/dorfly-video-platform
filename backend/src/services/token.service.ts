import prisma from "../db/client.ts"
import jwt from "jsonwebtoken"

export const generateTokens = async (userId: string, role: string) => {
    const accessToken = jwt.sign({ userId, role }, process.env.JWT_ACCESS_SECRET!, { expiresIn: "10m" })
    const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET!, { expiresIn: "30d" })

    return { accessToken, refreshToken }
}

export const saveToken = async (userId: string, refreshToken: string) => {
    return await prisma.token.upsert({
        where: { userId },
        update: { refreshToken },
        create: { userId, refreshToken }
    })
}

export const refreshService = async (refreshToken: string) => {
    const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as any;
    
    const tokenInDb = await prisma.token.findUnique({
        where: { refreshToken }
    });
    
    if (!tokenInDb) throw new Error("Token not found");

    const user = await prisma.user.findUnique({ where: { id: userData.userId } });
    if (!user) throw new Error("User not found");

    const tokens = await generateTokens(user.id, user.role as string);
    
    await saveToken(user.id, tokens.refreshToken);

    return { ...tokens, user };
}