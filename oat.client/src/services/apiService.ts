import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import authStore from '../store/AuthStore'
export class ApiService {
    static api: AxiosInstance
    static {
        ApiService.api = axios.create({
            baseURL: 'https://localhost:444',
        })

        ApiService.api.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                const token = authStore.authData.accessToken
                if (!!token && token !== '') {
                    config.headers.Authorization = `Bearer ${token}`
                } else {
                    console.error('Token is invalide')
                }
                return config
            }
        )

        // ApiService.api.interceptors.response.use(
        //     (response) => {
        //         return response
        //     },
        //     (error: any) => {
        //         const { status } = error.response
        //         const { config } = error
        //         if (status === 401 && !config._retry) {
        //             const tokens = JSON.parse(
        //                 localStorage.getItem(StorageKeys.Token)
        //             )
        //             config._retry = true
        //             return AuthService.regenerateNewTokens(tokens.refreshToken)
        //                 .then((payload) => {
        //                     const { accessToken, refreshToken } = payload.data
        //                     localStorage.setItem(
        //                         StorageKeys.Token,
        //                         JSON.stringify({
        //                             token: accessToken,
        //                             refreshToken,
        //                         })
        //                     )
        //                     store.dispatch(
        //                         setTokenAction({
        //                             token: accessToken,
        //                             refreshToken,
        //                         })
        //                     )
        //                     config.headers.Authorization = `Bearer ${payload?.data?.accessToken}`
        //                     return ApiService.api(config)
        //                 })
        //                 .catch((error) => Promise.reject(error))
        //         }
        //         return Promise.reject(error)
        //     }
        // )
    }
}
