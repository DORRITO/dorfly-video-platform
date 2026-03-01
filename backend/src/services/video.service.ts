import prisma from "../db/client.ts";

export const uploadVideoService = ( 
    title: string, 
    description: string, 
    category_id: string, 
    subcategory_id: string,
    videoFile: any,
    previewFile: any,
    userId: string,
    duration: number
    ) => {
    return prisma.video.create({
        data: {
            title: title,
            description: description,
            categoryId: category_id,
            subcategory_id: subcategory_id || null,
            video_url: videoFile.path,
            preview: previewFile.path,
            creator_id: userId,
            duration_sec: Math.round(duration)
        },
        select: {
            id: true,
            title: true,
            description: true,
            creator: {
                select: {
                    id: true,
                    nickname: true,
                    avatar: true,
                    _count: {
                        select: {
                            followers: true
                        }
                    }
                }
            },
            video_url: true,
            preview: true,
            views_count: true,
            created_at: true,
            category: true,
            subcategory: true,
            _count: {
                select: {
                    likes: true,
                    comments: true
                }
            },
            duration_sec: true
        }
    })
}

export const getAllVideosService = () => {
    return prisma.video.findMany({
        select: {
            id: true,
            title: true,
            preview: true,
            views_count: true,
            created_at: true,
            creator: {
                select: {
                    nickname: true,
                    avatar: true
                }
            },
            category: true,
            subcategory: true,
            duration_sec: true
        }
    })
}

export const getVideoByIdService = async (videoId: string) => {
    return await prisma.video.findUnique({
        where: {
            id: videoId
        },
        select: {
            id: true,
            title: true,
            description: true,
            creator: {
                select: {
                    id: true,
                    nickname: true,
                    avatar: true,
                    _count: {
                        select: {
                            followers: true
                        }
                    }
                }
            },
            video_url: true,
            preview: true,
            views_count: true,
            created_at: true,
            category: true,
            subcategory: true,
            _count: {
                select: {
                    likes: true,
                    comments: true
                }
            },
            duration_sec: true
        }
    })
}

export const getVideosByCategoryService = async (caterory_id: string) => {
    return await prisma.video.findMany({
        where: {
            categoryId: caterory_id 
        },
        select: {
            id: true,
            title: true,
            preview: true,
            views_count: true,
            created_at: true,
            creator: {
                select: {
                    nickname: true,
                    avatar: true
                }
            },
            category: true,
            subcategory: true,
            duration_sec: true
        }
    })
}

export const getVideosBySubCategoryService = async (subcaterory_id: string) => {
    return await prisma.video.findMany({
        where: {
            subcategory_id: subcaterory_id 
        },
        select: {
            id: true,
            title: true,
            preview: true,
            views_count: true,
            created_at: true,
            creator: {
                select: {
                    nickname: true,
                    avatar: true
                }
            },
            category: true,
            subcategory: true,
            duration_sec: true
        }
    })
}

export const deleteVideoSerivce = async(videoId: string) => {
    return await prisma.video.delete({
        where: {
            id: videoId
        }
    })
}