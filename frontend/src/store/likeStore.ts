import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { api } from '../api'
import { sendError } from '../utils/sendDecree'
import useUIStore from './useUIStore'
import { likeRoutes } from '../api/routes/routes'
import useAuthStore from './authStore'
import useVideoStore from './videoStore'
import type { LikeType } from '../types/like'

const useLikeStore = create<LikeType>()(
    devtools((set, get) => ({
        isLike: false,

        toggleLike: async(videoId: string) => {
            try{
                useUIStore.getState().startLoading()

                const res = await api.post(likeRoutes.toggleLike, {
                    videoId
                })

                useVideoStore.setState({ video: res.data?.data?.video })
                await get().checkStatusLike(videoId)

            } catch(e){
                sendError(e)
            } finally {
                useUIStore.getState().stopLoading()
            }
        },

        checkStatusLike: async(videoId: string) => {
            const isAuth = useAuthStore.getState().isAuth

            if(!isAuth) return 

            try{
                useUIStore.getState().startLoading()

                const res = await api.get(likeRoutes.checkLike(videoId))

                set({ isLike: res.data?.data?.isLike })

            } catch(e){
                sendError(e)
            } finally {
                useUIStore.getState().stopLoading()
            }
        }
    }))
)

export default useLikeStore