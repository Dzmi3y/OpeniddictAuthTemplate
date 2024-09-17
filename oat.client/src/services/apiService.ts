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
import { config } from '../config'
export class ApiService {
    static api: AxiosInstance
    static getTokenRequest(username?: string, password?: string): TokenRequest {
        let grant_type =
            username && password
                ? config.grant_type_password
                : config.grant_type_refresh_token

        return {
            username: username ?? '',
            password: password ?? '',
            grant_type: grant_type,
            client_id: config.client_id,
            client_secret: config.client_secret,
            refresh_token: AuthStore.authData?.refreshToken ?? '',
        }
    }

    static {
        ApiService.api = axios.create({
            baseURL: config.baseApiUrl,
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
                        const tokenRequest: TokenRequest =
                            this.getTokenRequest()

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
