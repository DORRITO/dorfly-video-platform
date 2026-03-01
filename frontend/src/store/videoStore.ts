import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { api } from '../api'
import { videoRoutes } from '../api/routes/routes'
import type { Video } from '../types/video'

interface VideosState {
    videos: any[],
    videosFromCategory: any[],
    videosFromSubCategory: any[],
    isLoading: boolean,
    video: Video | null,
    getAllVideos: () => Promise<void>,
    getVideosFromCategory: () => Promise<void>,
    getVideosFromSubCategory: () => Promise<void>,
    getVideoFromId: () => Promise<void>
}

const useVideoStore = create<VideosState>()(
    devtools((set) => ({
        videos: [],
        videosFromCategory: [],
        videosFromSubCategory: [],
        video: null,
        isLoading: false,

        getAllVideos: async () => {
            try{
                set({ isLoading: true })

                const res = api.get(videoRoutes.getAllVideos)
                const videos = (await res).data?.data?.videos ?? []

                set({ videos: videos })
            } catch(e){
                console.log(e)
            } finally {
                set({ isLoading: false })
            }
        },

        getVideosFromCategory: async (categoryId: string) => {
            try{
                set({ isLoading: true })

                const res = await api.get(videoRoutes.getVideoFromCategory(categoryId))
                const videos = res.data?.data?.videos
                    
                set({ videosFromCategory: videos })

            } catch(e){
                console.log(e)
            } finally {
                set({ isLoading: false })
            }
        },

        getVideosFromSubCategory: async (subCategoryId: string) => {
            try{
                set({ isLoading: true })

                const res = await api.get(videoRoutes.getVideoFromSubCategory(subCategoryId))
                const videos = res.data?.data?.videos
                    
                set({ videosFromSubCategory: videos })

            } catch(e){
                console.log(e)
            } finally {
                set({ isLoading: false })
            }
        },

        getVideoFromId: async (videoId: string) => {
            try{
                set({ isLoading: true })

                const res = await api.get(videoRoutes.getVideoFromId(videoId))
                const video = res.data?.data?.video ?? null

                set({ video })
            } catch(e){
                console.log(e)
            } finally {
                set({ isLoading: false })
            }
        }
    }))
)

export default useVideoStore