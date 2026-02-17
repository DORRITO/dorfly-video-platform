import type { Response } from "express";

export const sendSuccess = (res: Response, message: string = "Success", status: number = 200, data: any = null) => {
    return res.status(status).json({
        success: true,
        message,
        data
    })
}

export const sendError = (res: Response, message: string = "Error", status: number = 500, data: any = null) => {
    return res.status(status).json({
        success: false,
        message,
        data
    })
}