import axios from 'axios';
import { getTokenCookie } from '@/utils/cookies'

export const unauthenticatedService = axios.create({
    baseURL: `${process.env.BASE_API}/api`
})

export const authenticatedService = axios.create({
    baseURL: `${process.env.BASE_API}/api`
})

authenticatedService.interceptors.request.use(
    (config) => {
        if (getTokenCookie() !== null) {
            config.headers.Authorization = `Bearer ${getTokenCookie()}`
        }
        return config;
    },
    error => {
        Promise.reject(error)
    }
)


