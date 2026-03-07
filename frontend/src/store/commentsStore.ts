import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { api } from '../api'
import { commentsRoutes } from '../api/routes/routes'
import type { VideoComment } from '../types/comment'
import { sendError } from '../utils/sendDecree'
import useUIStore from './useUIStore'

interface CommentsState {
  comments: VideoComment[]
  getCommentsFromVideo: (videoId: string) => Promise<void>
}

const useCommentsStore = create<CommentsState>() (
  devtools((set) => ({
    comments: [],

    getCommentsFromVideo: async (videoId) => {
      try {
        useUIStore.getState().startLoading()
        const res = await api.get(commentsRoutes.getCommentsFromVideo(videoId))
        const comments = res.data?.data?.comments ?? []
        set({ comments })
      } catch (e) {
        sendError(e)
      } finally {
        useUIStore.getState().stopLoading()
      }
    },
  }))
)

export default useCommentsStore
