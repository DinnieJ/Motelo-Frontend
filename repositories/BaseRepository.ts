import axios from 'axios';

const createAxiosInstance = () => {
    return axios.create({
        baseURL: `${process.env.BASE_API}/api`
    })
}

export const unauthenticatedService = createAxiosInstance()


export let authenticatedService = createAxiosInstance()

export const setToken = (token: any) => {
    authenticatedService = createAxiosInstance()

    if (token) {
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

    // not token => clear token
}

// authenticatedService.interceptors.response.use(function(response) {
//     return response
// }, function (error) {
//     if(error.response.status == 401 && error.response.status == 403) {
        
//     }
// })