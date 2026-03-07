import type { Request, Response } from 'express'
import { sendError, sendSuccess } from '../utils/apiResponse.ts'
import { findUserIdService, findUserNicknameService, updateUserService } from '../services/profile.service.ts'
import { checkNicknameOnBase } from '../services/auth.service.ts'

export const getUserForNickname = async (req: Request, res: Response) => {
    try{
        const { nickname } = req.params

        const user = await findUserNicknameService(nickname as string)

        if(!user){
            return sendError(res, "Пользователь не найден", 404)
        }

        return sendSuccess(res, "Данные успешно получены", 200, { user: user })
        
    } catch(e){
        console.log(e)
        return sendError(res, "Что то пошло не так", 500)
    }
}

export const getAuthorizedUser = async (req: Request, res: Response) => {
    try{
        const userId = req.userId as string

        const user = await findUserIdService(userId)
        if(!user){
            return sendError(res, "Пользователь не найден", 404)
        }

        return sendSuccess(res, "Данные успешно получены", 200, { user: user })
    } catch(e){
        return sendError(res, "Что то пошло не так", 500)
    }
}

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.userId as string
        const updates = req.body
        const avatar = req.file?.path

        if (updates.nickname) {
            const findNickname = await checkNicknameOnBase(updates.nickname)
            
            if (findNickname && findNickname.id !== userId) {
                return sendError(res, "Такой никнейм уже занят", 400)
            }
        }

        if(avatar){
            updates.avatar = avatar
        }

        const updatedUser = await updateUserService(userId, updates)

        return sendSuccess(res, "Данные успешно обновлены", 200, { user: updatedUser })
        
    } catch (e) {
        console.log(e)
        return sendError(res, "Что-то пошло не так при обновлении", 500)
    }
}