import type { NextFunction, Request, Response, } from 'express'
import jwt from "jsonwebtoken"
import { sendError } from '../utils/apiResponse'

interface AuthRequest extends Request {
    userId?: string
}

export const authMiddelware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token) return sendError(res, "Токен не был предоставлен", 401)
    
    jwt.verify(token, process.env.JWT_ACCESS_SECRET!, (err, decoded) => {
        if(err) return sendError(res, "Произошла ошибка", 401)
        req.userId = (decoded as any).userId
        next()
    })
}