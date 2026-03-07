import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { api } from '../api'
import { videoRoutes } from '../api/routes/routes'
import type { Video, VideoCategory, VideoSubCategory } from '../types/video'
import useUIStore from './useUIStore'

interface VideosState {
  videos: Video[]
  videosFromCategory: Video[]
  videosFromSubCategory: Video[]
  video: Video | null
  getAllVideos: () => Promise<void>
  getVideosFromCategory: (categoryId: VideoCategory['id']) => Promise<void>
  getVideosFromSubCategory: (subCategoryId: VideoSubCategory['id']) => Promise<void>
  getVideoById: (videoId: Video['id']) => Promise<void>
  getVideoByNickname: (nickname: string) => Promise<void>
}

const useVideoStore = create<VideosState>()(
  devtools((set) => ({
    videos: [],
    videosFromCategory: [],
    videosFromSubCategory: [],
    video: null,

    getAllVideos: async () => {
      try {
        useUIStore.getState().startLoading()
        const res = await api.get(videoRoutes.getAllVideos)
        const videos = res.data?.data?.videos ?? []
        set({ videos })
      } catch (e) {
        console.error(e)
      } finally {
        useUIStore.getState().stopLoading()
      }
    },

    getVideosFromCategory: async (categoryId) => {
      try {
        useUIStore.getState().startLoading()
        const res = await api.get(videoRoutes.getVideoFromCategory(categoryId))
        const videos = res.data?.data?.videos ?? []
        set({ videosFromCategory: videos })
      } catch (e) {
        console.error(e)
      } finally {
        useUIStore.getState().stopLoading()
      }
    },

    getVideosFromSubCategory: async (subCategoryId) => {
      try {
        useUIStore.getState().startLoading()
        const res = await api.get(videoRoutes.getVideoFromSubCategory(subCategoryId))
        const videos = res.data?.data?.videos ?? []
        set({ videosFromSubCategory: videos })
      } catch (e) {
        console.error(e)
      } finally {
        useUIStore.getState().stopLoading()
      }
    },

    getVideoById: async (videoId) => {
      try {
        useUIStore.getState().startLoading()
        const res = await api.get(videoRoutes.getVideoById(videoId))
        const video = res.data?.data?.video ?? null
        set({ video })
      } catch (e) {
        console.error(e)
      } finally {
        useUIStore.getState().stopLoading()
      }
    },

    getVideoByNickname: async (nickname) => {
      try {
        useUIStore.getState().startLoading()
        const res = await api.get(videoRoutes.getVideosByNickname(nickname))
        const videos = res.data?.data?.videos ?? []
        set({ videos })
      } catch (e) {
        console.error(e)
      } finally {
        useUIStore.getState().stopLoading()
      }
    },
  }))
)

export default useVideoStore
