import prisma from "../db/client.ts";

export const uploadVideoService = ( 
    title: string, 
    description: string, 
    category_id: string, 
    subcategory_id: string,
    videoFile: any,
    previewFile: any,
    userId: string
    ) => {
    return prisma.video.create({
        data: {
            title: title,
            description: description,
            category_id: category_id,
            subcategory_id: subcategory_id || null,
            video_url: videoFile.path,
            preview: previewFile.path,
            creator_id: userId
        }
    })
}

export const getAllVideosService = () => {
    return prisma.video.findMany()
}

export const getVideoByIdService = async (videoId: string) => {
    return await prisma.video.findUnique({
        where: {
            id: videoId
        }
    })
}

export const getVideosByCategoryService = async (caterory_id: string) => {
    return await prisma.video.findMany({
        where: {
            category_id: caterory_id 
        }
    })
}

export const getVideosBySubCategoryService = async (subcaterory_id: string) => {
    return await prisma.video.findMany({
        where: {
            subcategory_id: subcaterory_id 
        }
    })
}