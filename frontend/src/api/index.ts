import axios from "axios";

const API_BASE = "http://localhost:5001"

export const api = axios.create({
    baseURL: API_BASE,
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error?.response?.status;
        if (
            (status === 401 || status === 403) &&
            typeof window !== 'undefined' &&
            window.location?.pathname?.startsWith('/admin')
        ) {
            delete api.defaults.headers.common.Authorization;
            window.location.replace('/');
        }
        return Promise.reject(error);
    }
);