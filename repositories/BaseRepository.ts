import axios from 'axios';
import { getTokenCookie } from '@/utils/cookies'
import { COOKIES } from '@/constants/app.constant'

export const unauthenticatedService = axios.create({
    baseURL: `${process.env.BASE_API}/api`
})

export const authenticatedService = axios.create({
    baseURL: `${process.env.BASE_API}/api`
})

export const setToken = (token: any) => {
    authenticatedService.interceptors.request.use(
        (config) => {
            config.headers.Authorization = `Bearer ${token}`
            return config
        },
        (error) => {
            Promise.reject(error)
        }
    )
}
