import axios from 'axios';
import { getTokenCookie } from '@/utils/cookies'
import { COOKIES } from '@/constants/app.constant'

const createAxiosInstance = () => {
    return axios.create({
        baseURL: `${process.env.BASE_API}/api`
    })
}

export const unauthenticatedService = createAxiosInstance()


export let authenticatedService = createAxiosInstance()

export const setToken = (token: any) => {
    authenticatedService = createAxiosInstance()
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
