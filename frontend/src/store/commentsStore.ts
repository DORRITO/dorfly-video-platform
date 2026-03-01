import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { api } from '../api'
import { commentsRoutes } from '../api/routes/routes'

interface CommentsState {
    comments: any[],
    isLoading: boolean,
    getCommentsFromVideo: Promise<void>
}

const useCommentsStore = create<CommentsState>() (
    devtools((set) => ({
        comments: [],
        isLoading: false,

        getCommentsFromVideo: async (videoId: string) => {
            try{
                set({ isLoading: false })

                const res = await api.get(commentsRoutes.getCommentsFromVideo(videoId))
                const comments = res.data?.data?.comments

                set({ comments: comments })

            } catch(e){
                console.log(e)
            } finally {
                set({ isLoading: false })
            }
        }
    }))
)

export default useCommentsStore