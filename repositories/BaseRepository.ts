import axios from 'axios';
import { getTokenCookie } from '@/utils/cookies'
import { COOKIES } from '@/constants/app.constant'

export const unauthenticatedService = axios.create({
    baseURL: `${process.env.BASE_API}/api`
})

export const authenticatedService = axios.create({
    baseURL: `${process.env.BASE_API}/api`
})

