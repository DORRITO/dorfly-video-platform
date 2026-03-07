import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { api } from '../api'
import type { ProfileState } from '../types/profile'
import { profileRoutes } from '../api/routes/routes'
import useUIStore from './useUIStore'
import { sendError, sendSuccess } from '../utils/sendDecree'
import useAuthStore from './authStore'

const useProfileStore = create<ProfileState>()(
    devtools((set) => ({
        user: null,

        getProfile: async(nickname: string) => {
            try{
                useUIStore.getState().startLoading()
                
                const res = await api.get(profileRoutes.getProfile(nickname))
                set({ user: res.data?.data?.user })
            } catch(e){
                sendError(e)
            } finally {
                useUIStore.getState().stopLoading()
            }
        },

        getProfileById: async(userId: string) => {
            try{
                useUIStore.getState().startLoading()
                
                const res = await api.get(profileRoutes.getProfile(nickname))
                set({ user: res.data?.data?.user })
            } catch(e){
                sendError(e)
            } finally {
                useUIStore.getState().stopLoading()
            }
        },

        getAuthorizedUser: async() => {
            try{
                useUIStore.getState().startLoading()

                const res = await api.get(profileRoutes.getAuthorizedUser)
                useAuthStore.setState({ user: res.data?.data?.user })

            } catch(e){
                sendError(e)
            } finally {
                useUIStore.getState().stopLoading()
            }
        },

        updateProfile: async(nickname: string, avatar: File | null, description: string) => {
            try{
                useUIStore.getState().startLoading()

                const formData = new FormData()
                formData.append('nickname', nickname)
                formData.append('description', description)

                if(avatar){
                    formData.append('avatar', avatar)
                }

                const res = await api.put(profileRoutes.updateProfile, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })

                useAuthStore.setState({ user: res.data?.data?.user })

                return sendSuccess("Профиль обновлен")

            } catch(e){
                sendError(e)
            } finally {
                useUIStore.getState().stopLoading()
            }
        }
    }))
)

export default useProfileStore
