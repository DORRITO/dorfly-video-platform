import prisma from "../db/client.ts"

export const addCategoryService = async (name: string, preview: any) => {
    return await prisma.category.create({
        data: {
            name: name,
            preview: preview.path
        }
    })
}

export const getAllCategoriesService = async () => {
    return await prisma.category.findMany()
}