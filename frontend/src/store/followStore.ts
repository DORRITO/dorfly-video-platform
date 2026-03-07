import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { api } from '../api'
import { sendError } from '../utils/sendDecree'
import useUIStore from './useUIStore'
import { followRoutes } from '../api/routes/routes'
import type { FollowsType } from '../types/follows'
import useProfileStore from './profileStore'
import useAuthStore from './authStore'

const useFollowStore = create<FollowsType>()(
    devtools((set, get) => ({
        isFollowing: false,

        toggleFollow: async(followingId: string) => {
            try{
                useUIStore.getState().startLoading()

                const res = await api.post(followRoutes.toggleFollow, {
                    followingId
                })

                useProfileStore.setState({ user: res.data?.data?.user })
                await get().checkStatusFollow(followingId)

            } catch(e){
                sendError(e)
            } finally {
                useUIStore.getState().stopLoading()
            }
        },

        checkStatusFollow: async(followingId: string) => {
            const isAuth = useAuthStore.getState().isAuth

            if(!isAuth) return 

            try{
                useUIStore.getState().startLoading()

                const res = await api.get(followRoutes.checkStatus(followingId))

                set({ isFollowing: res.data?.data?.isFollowing })

            } catch(e){
                sendError(e)
            } finally {
                useUIStore.getState().stopLoading()
            }
        }
    }))
)

export default useFollowStore