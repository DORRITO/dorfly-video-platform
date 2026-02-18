import type { NextFunction, Request, Response } from 'express'
import { findUserIdService } from '../services/profile.service.ts'
import { sendError } from '../utils/apiResponse.ts'

export const checkRole = (allowedRoles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = (req as any).userId;
            
            if (!userId) {
                return sendError(res, "Пользователь не авторизован", 401);
            }

            const user = await findUserIdService(userId);

            if (!user || !allowedRoles.includes(user.role)) {
                return sendError(res, "Недостаточно прав", 403);
            }

            next();
        } catch (e) {
            return sendError(res, "Ошибка проверки прав", 500);
        }
    }
}