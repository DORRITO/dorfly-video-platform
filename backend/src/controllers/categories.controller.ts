import type { Request, Response } from 'express'
import { sendError, sendSuccess } from '../utils/apiResponse.ts'
import { addCategoryService, getAllCategoriesService } from '../services/categories.service.ts'

export const createCategory = async (req: Request, res: Response) => {
    try{
        const { name } = req.body
        const preview = req.file

        if(!name || !preview){
           return sendError(res, "Не все данные были предоставлены", 400)
        }

        const category = await addCategoryService(name, preview)
        return sendSuccess(res, "Категория создана", 200, { category: category })
    } catch(e){
        console.log(e)
        return sendError(res, "Произошла ошибка при создании категории", 500)
    }
}

export const getAllCategories = async (req: Request, res: Response) => {
    try{
        const allCategories = await getAllCategoriesService()
        return sendSuccess(res, "Все категории получены", 200, { categories: allCategories })
    } catch(e){
        console.log(e)
        return sendError(res, "Произошла ошибка", 500)
    }
}