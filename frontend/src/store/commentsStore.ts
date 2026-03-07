import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { api } from '../api'
import { commentsRoutes } from '../api/routes/routes'
import type { VideoComment } from '../types/comment'

interface CommentsState {
  comments: VideoComment[]
  isLoading: boolean
  getCommentsFromVideo: (videoId: string) => Promise<void>
}

const useCommentsStore = create<CommentsState>() (
  devtools((set) => ({
    comments: [],
    isLoading: false,

    getCommentsFromVideo: async (videoId) => {
      try {
        set({ isLoading: true })
        const res = await api.get(commentsRoutes.getCommentsFromVideo(videoId))
        const comments = res.data?.data?.comments ?? []
        set({ comments })
      } catch (e) {
        console.error(e)
      } finally {
        set({ isLoading: false })
      }
    },
  }))
)

export default useCommentsStore
