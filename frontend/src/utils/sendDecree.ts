import { notify } from "./notify"

export const sendError = (e: any) => {
    console.error(e)
    notify.error(`${e.response?.data?.message || 'Произошла ошибка'}`)
}

export const sendSuccess = (message: string) => {
    notify.success(`${message}`)
}