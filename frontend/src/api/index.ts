import axios from "axios"

import type{
    AxiosError,
    AxiosRequestConfig,
    AxiosResponse
} from "axios";
import useAuthStore from "../store/authStore";
import { authRoutes } from "./routes/routes";

const API_BASE = "http://localhost:5001"

type RetryAxiosRequestConfig = AxiosRequestConfig & {
    _retry?: boolean 
}

export const api = axios.create({
    baseURL: API_BASE,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken

    if(token) {
        config.headers = config.headers ?? {}
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

let refreshPromise: Promise<string | null> | null = null

api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const status = error.response?.status
        const original = error.config as RetryAxiosRequestConfig | undefined

        if(!original) return Promise.reject(error)

        const isRefreshCall = 
            typeof original.url === "string" &&
            original.url.includes(authRoutes.refresh)

        if(isRefreshCall) {
            try{
                await useAuthStore.getState().logout()
            } catch (logoutError) {
                console.error(logoutError)
            }
            return Promise.reject(error)
        }

        if((status === 401 || status === 403) && !original._retry) {
            original._retry = true

            try {
                if(!refreshPromise) {
                    refreshPromise = useAuthStore
                        .getState()
                        .refresh()
                        .finally(() => {
                            refreshPromise = null
                        })
                }

                const newToken = await refreshPromise

                if(!newToken){
                    try{
                        await useAuthStore.getState().logout()
                    } catch (logoutError) {
                        console.error(logoutError)
                    }
                    return Promise.reject(error)
                }

                original.headers = original.headers ?? {}
                original.headers.Authorization = `Bearer ${newToken}`

                return api(original)
            } catch (refreshError) {
                console.error(refreshError)
            }
            return Promise.reject(error)
        }

        return Promise.reject(error)
    }
)
