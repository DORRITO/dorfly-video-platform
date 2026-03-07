import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { api } from '../api'
import type { ProfileState } from '../types/profile'
import { profileRoutes } from '../api/routes/routes'
import useUIStore from './useUIStore'

const useProfileStore = create<ProfileState>()(
    devtools((set) => ({
        user: null,

        getProfile: async(nickname: string) => {
            try{
                useUIStore.getState().startLoading()
                
                const res = await api.get(profileRoutes.getProfile(nickname))
                set({ user: res.data?.data?.user })
            } catch(e){
                console.error(e)
            } finally {
                useUIStore.getState().stopLoading()
            }
        }
    }))
)

export default useProfileStore
