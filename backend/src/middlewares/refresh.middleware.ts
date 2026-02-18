import type { Request, Response, NextFunction } from 'express'
import { sendError } from '../utils/apiResponse.ts'

export const refreshMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
        return sendError(res, "Сессия истекла или отсутствует", 401)
    }

    next()
}