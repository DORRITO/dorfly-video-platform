import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { api } from '../api'
import { authRoutes } from '../api/routes/routes'
import { sendError } from '../utils/sendDecree'
import useUIStore from './useUIStore'

type User = {
    id: string,
    nickname: string,
    email: string
}

interface UserState {
  user: User | null
  accessToken: string | null
  isAuth: boolean
  isInitializing: boolean
  error: string | null
  signUpUser: (nickname: string, email: string, password: string) => Promise<void>
  loginUser: (email: string, password: string) => Promise<void>
  refresh: () => Promise<string | null>
  logout: () => Promise<void>
  initAuth: () => Promise<void>
}

const useAuthStore = create<UserState>() (
  devtools((set, get) => ({
    user: null,
    accessToken: null,
    isAuth: false,
    isInitializing: true,
    error: null,

    initAuth: async () => {
      try {
        await get().refresh()
      } finally {
        set({ isInitializing: false })
      }
    },

    signUpUser: async (nickname, email, password) => {
      try {
        useUIStore.getState().startLoading()
        const res = await api.post(authRoutes.signUp, { nickname, email, password })
        const data = res.data?.data
        const accessToken = data?.accessToken ?? null
        set({
          accessToken,
          isAuth: !!accessToken,
          user: data?.user ?? null,
        })
      } catch (e) {
        sendError(e)
      } finally {
        useUIStore.getState().stopLoading()
      }
    },

    loginUser: async (email, password) => {
      try {
        useUIStore.getState().startLoading()
        const res = await api.post(authRoutes.login, { email, password })
        const data = res.data?.data
        const accessToken = data?.accessToken ?? null
        set({
          accessToken,
          isAuth: !!accessToken,
          user: data?.user ?? null,
        })
      } catch (e) {
        sendError(e)
      } finally {
        useUIStore.getState().stopLoading()
      }
    },

    refresh: async () => {
      try {
        useUIStore.getState().startLoading()
        const res = await api.post(authRoutes.refresh)
        const data = res.data?.data
        const accessToken = data?.accessToken ?? null
        const user = data?.user ?? null
        set({
          accessToken,
          user,
          isAuth: !!accessToken,
        })
        return accessToken
      } catch {
        set({
          user: null,
          accessToken: null,
          isAuth: false,
        })
        return null
      } finally {
        useUIStore.getState().stopLoading()
      }
    },

    logout: async () => {
      try {
        useUIStore.getState().startLoading()
        await api.post(authRoutes.logout)
      } catch (e) {
        console.log(e)
      } finally {
        set({
          user: null,
          accessToken: null,
          isAuth: false,
        })
        useUIStore.getState().stopLoading()
      }
    },
  }))
)

export default useAuthStore
