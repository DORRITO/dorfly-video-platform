export const categoryRoutes = {
    getAllCategories: '/categories/all',
    getSubCategories: (categoryId: string) => `/categories/all/subcategories?category_id=${categoryId}`,
}

export const videoRoutes = {
    getAllVideos: '/video/all',
    getVideoFromCategory: (categoryId: string) => `/video/category?category_id=${categoryId}`,
    getVideoFromSubCategory: (subCategoryId: string) => `/video/subcategory?subcategory_id=${subCategoryId}`,
    getVideoFromId: (videoId: string) => `/video/video?videoId=${videoId}`
}

export const commentsRoutes = {
    getCommentsFromVideo: (videoId: string) => `/comment/video?videoId=${videoId}`
}