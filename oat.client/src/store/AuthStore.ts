import { makeAutoObservable } from 'mobx'
import { AuthData } from '../models/AuthData'
import { AuthService } from '../services/authService'
import { TokenRequest } from '../models/Requests/TokenRequest'
import { AxiosError, AxiosResponse } from 'axios'
import { TokenResponse } from '../models/Responses/TokenResponse'
import ApiRequestInfo from '../models/ApiRequestInfo'
import { LogOutRequest } from '../models/Requests/LogOutRequest'
import { UserDataResponse } from '../models/Responses/UserDataResponse'

export interface IAuthStore {
    authData: AuthData
    setAuthData: (authData: AuthData) => void
    login: (username: string, password: string) => Promise<ApiRequestInfo>
    register: (username: string, password: string) => Promise<ApiRequestInfo>
    logout: () => Promise<void>
    getAccountInfo: () => Promise<AxiosResponse<UserDataResponse>>
}

class AuthStore implements IAuthStore {
    private _authData: AuthData

    constructor() {
        this._authData = localStorage.authData
            ? JSON.parse(localStorage.authData)
            : {}
        makeAutoObservable(this)
    }

    get authData(): AuthData {
        return this._authData
    }

    setAuthData = (authData: AuthData) => {
        this._authData = authData
        localStorage.authData = JSON.stringify(authData)
    }

    login = async (
        username: string,
        password: string
    ): Promise<ApiRequestInfo> => {
        try {
            const tokenRequest: TokenRequest = {
                username: username,
                password: password,
                grant_type: 'password',
                client_id: 'default-client',
                client_secret: '499D56FA-B47B-5199-BA61-B298D431C318',
                refresh_token: '',
            }
            let axiosResponse: AxiosResponse<TokenResponse> =
                await AuthService.login(tokenRequest)
            if (axiosResponse.status === 200) {
                let authData: AuthData = {
                    accessToken: axiosResponse.data.access_token,
                    refreshToken: axiosResponse.data.refresh_token,
                }
                this.setAuthData(authData)
            }

            return new ApiRequestInfo(true)
        } catch (error) {
            console.error('Login failed', error)
            let status = (error as AxiosError).status
            if (status !== undefined && status === 401) {
                return new ApiRequestInfo(false, 'Invalid username or password')
            } else {
                return new ApiRequestInfo(false, 'Server is not available')
            }
        }
    }

    logout = async (): Promise<void> => {
        try {
            const logOutRequest: LogOutRequest = {
                client_secret: '499D56FA-B47B-5199-BA61-B298D431C318',
            }

            await AuthService.logout(logOutRequest)
            this.setAuthData({} as AuthData)
        } catch (error) {
            console.error('Logout failed', error)
        }
    }

    register = async (
        username: string,
        password: string
    ): Promise<ApiRequestInfo> => {
        try {
            let registerResponse: AxiosResponse<void> =
                await AuthService.register({
                    username,
                    password,
                })

            if (registerResponse.status === 200) {
                return new ApiRequestInfo(true)
            }
            return new ApiRequestInfo(false, registerResponse.statusText)
        } catch (error) {
            const axiosError = error as AxiosError
            return new ApiRequestInfo(
                false,
                axiosError.response?.data as string
            )
        }
    }

    getAccountInfo = async (): Promise<AxiosResponse<UserDataResponse>> => {
        try {
            return await AuthService.getAccountInfo()
        } catch (error) {
            console.error(error)
            return Promise.reject(error)
        }
    }
}
const authStore = new AuthStore()
export default authStore
