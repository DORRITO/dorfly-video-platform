import type { Request, Response } from 'express'
import { sendError, sendSuccess } from '../utils/apiResponse.ts'
import { addCategoryService, addSubCategoryService, deleteCategorySerivce, getAllCategoriesService, getSubcategoriesService } from '../services/categories.service.ts'

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

export const createSubCategory = async (req: Request, res: Response) => {
    try{
        const { name, category_id } = req.body

        if(!name && !category_id){
            return sendError(res, "Не все данные были предоставлены", 400)
        }

        const newSubCategory = await addSubCategoryService(name, category_id)

        return sendSuccess(res, "Подкатегория успешно создана", 200, { newSubCategory: newSubCategory })
    } catch(e){
        console.log(e)
        return sendError(res, "Произошла ошибка", 500)
    }
}

export const getSubcategories = async (req: Request, res: Response) => {
    try{
        const { category_id } = req.query

        if(!category_id){
            return sendError(res, "Не передана категория", 400)
        }

        const subcategories = await getSubcategoriesService(category_id as string)

        return sendSuccess(res, "Получены подкатегории", 200, { subcategories: subcategories })
    } catch(e){
        console.log(e)
        return sendError(res, "Произошла ошибка", 500)
    }
}

export const deleteCategory = async (req: Request, res: Response) => {
    try{
        const { category_id } = req.query

        await deleteCategorySerivce(category_id as string)

        return sendSuccess(res, "Категория удалена", 200, { deletedCategory: category_id })
    } catch(e){
        console.log(e)
        return sendError(res, "Произошла ошибка", 500)
    }
}