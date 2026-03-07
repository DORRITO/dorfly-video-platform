export const authRoutes = {
    signUp: `/auth/signup`,
    login: `/auth/login`,
    refresh: `/auth/refresh`,
    logout: `/auth/logout`
}

export const categoryRoutes = {
    getAllCategories: '/categories/all',
    getSubCategories: (categoryId: string) => `/categories/all/subcategories?category_id=${categoryId}`,
}

export const videoRoutes = {
    getAllVideos: '/video/all',
    getVideoFromCategory: (categoryId: string) => `/video/category?category_id=${categoryId}`,
    getVideoFromSubCategory: (subCategoryId: string) => `/video/subcategory?subcategory_id=${subCategoryId}`,
    getVideoById: (videoId: string) => `/video/video?videoId=${videoId}`,
    getVideosByNickname: (nickname: string) => `/video/videos?nickname=${nickname}`,
}

export const commentsRoutes = {
    getCommentsFromVideo: (videoId: string) => `/comment/video?videoId=${videoId}`
}

export const profileRoutes = {
    getProfile: (nickname: string) => `/profile/${nickname}`
}