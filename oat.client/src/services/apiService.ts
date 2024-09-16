import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from 'axios'
import authStore from '../store/AuthStore'
import AuthStore from '../store/AuthStore'
import { TokenRequest } from '../models/Requests/TokenRequest'
import { TokenResponse } from '../models/Responses/TokenResponse'
import { AuthService } from './authService'
import { AuthData } from '../models/AuthData'
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

        ApiService.api.interceptors.response.use(
            (response) => {
                return response
            },
            async (error: any) => {
                const { status } = error.response
                const { config } = error

                if (status === 401 && !config._retry) {
                    try {
                        config._retry = true
                        const tokenRequest: TokenRequest = {
                            username: '',
                            password: '',
                            grant_type: 'refresh_token',
                            client_id: 'default-client',
                            client_secret:
                                '499D56FA-B47B-5199-BA61-B298D431C318',
                            refresh_token: AuthStore.authData.refreshToken,
                        }

                        let axiosResponse: AxiosResponse<TokenResponse> =
                            await AuthService.login(tokenRequest)
                        if (axiosResponse.status === 200) {
                            let authData: AuthData = {
                                accessToken: axiosResponse.data.access_token,
                                refreshToken: axiosResponse.data.refresh_token,
                            }
                            AuthStore.setAuthData(authData)
                            config.headers.Authorization = `Bearer ${authData.accessToken}`
                            return ApiService.api(config)
                        }
                    } catch (error) {
                        Promise.reject(error)
                    }
                }
                return Promise.reject(error)
            }
        )
    }
}
