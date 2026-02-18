import type { Request, Response } from 'express'
import { sendError, sendSuccess } from '../utils/apiResponse.ts'
import { findUserIdService, findUserNicknameService, updateUserService } from '../services/profile.service.ts'
import { checkNicknameOnBase } from '../services/auth.service.ts'

export const getUserForNickname = async (req: Request, res: Response) => {
    try{
        const { nickname } = req.params

        const user = await findUserNicknameService(nickname as string)

        return sendSuccess(res, "Данные успешно получены", 200, { user: user })
        
    } catch(e){
        sendError(res, "Что то пошло не так", 500)
        console.log(e)
    }
}

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.userId as string
        const updates = req.body

        if (updates.nickname) {
            const findNickname = await checkNicknameOnBase(updates.nickname)
            
            if (findNickname && findNickname.id !== userId) {
                return sendError(res, "Такой никнейм уже занят", 400)
            }
        }

        const updatedUser = await updateUserService(userId, updates)

        return sendSuccess(res, "Данные успешно обновлены", 200, { user: updatedUser })
        
    } catch (e) {
        sendError(res, "Что-то пошло не так при обновлении", 500)
        console.log(e)
    }
}