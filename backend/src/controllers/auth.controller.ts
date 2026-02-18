import bcrypt from 'bcryptjs'
import type { Request, Response } from 'express'
import { chechEmailOnBase, checkNicknameOnBase, createUser } from '../services/auth.service.ts'
import { sendSuccess, sendError } from '../utils/apiResponse.ts'
import { generateTokens, saveToken } from '../services/token.service.ts'

export const signUp = async (req: Request, res: Response) => {
    try{
        const { email, nickname, password } = req.body

        if(!email || !password || !nickname){
            return sendError(res, "Не все данные были предоставлены", 400)
        }
        
        let user = await chechEmailOnBase(email)
        if(user){
            return sendError(res, "Пользователь с такой почтой уже существует", 400)
        }

        user = await checkNicknameOnBase(nickname)
        if(user){
            return sendError(res, "Пользователь с таким никнеймом уже существует", 400)
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = await createUser(email, nickname, hashPassword)

        const tokens = await generateTokens(newUser.id)
        await saveToken(newUser.id, (await tokens).refreshToken)

        res.cookie('refreshToken', tokens.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        })
        return sendSuccess(res, "Пользователь успешно создан!", 200, { accessToken: (await tokens).accessToken })
    } catch(e){
        sendError(res, "Ошибка создания пользователя", 500)
        console.log(e)
    }
}

export const login = async (req: Request, res: Response) => {
    try{
        const { email, password } = req.body

        if(!email || !password){
            return sendError(res, "Не все данные были предоставлены", 400)
        }

        let user = await chechEmailOnBase(email)
        if(!user){
            return sendError(res, "Почта или пароль не верны", 400)
        }

        const comparePassword = await bcrypt.compare(password, user.password_hash)

        if(!comparePassword){
            return sendError(res, "Почта или пароль не верны", 400)
        }

        const tokens = await generateTokens(user.id)
        await saveToken(user.id, (await tokens).refreshToken)

        res.cookie('refreshToken', tokens.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        })
        return sendSuccess(res, "Успешный вход!", 200, { accessToken: (await tokens).accessToken })
    } catch(e) {
        sendError(res, "Ошибка логина", 500)
        console.log(e)
    }
}