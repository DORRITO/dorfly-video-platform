import bcrypt from 'bcryptjs'
import type { Request, Response } from 'express'
import { chechEmailOnBase, checkNicknameOnBase, createUser } from '../services/auth.services.ts'
import { sendSuccess, sendError } from '../utils/apiResponse.ts'

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

        const hashPassword = await bcrypt.hashSync(password, 10)

        await createUser(email, nickname, hashPassword)

        return sendSuccess(res, "Пользователь успешно создан!", 200)

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

        return sendSuccess(res, "Успешная авторизация!", 200, { user })

    } catch(e) {
        sendError(res, "Ошибка логина", 500)
        console.log(e)
    }
}