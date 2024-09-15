import { AxiosResponse } from 'axios'
import qs from 'qs'
import { ApiService } from './apiService'
import { TokenRequest } from '../models/Requests/TokenRequest'
import { TokenResponse } from '../models/Responses/TokenResponse'
import { UserDataResponse } from '../models/Responses/UserDataResponse'
import { LogOutRequest } from '../models/Requests/LogOutRequest'

export class AuthService {
    static async login(
        tokenRequest: TokenRequest
    ): Promise<AxiosResponse<TokenResponse>> {
        const data = qs.stringify(tokenRequest)

        return ApiService.api.post<TokenResponse>('/account/gettoken', data)
    }

    // static async register(
    //     username: string,
    //     email: string,
    //     password: string
    // ): Promise<AxiosResponse<AuthResponse>> {
    //     return ApiService.api.post<AuthResponse>('/Account/LocalSignUp', {
    //         name: username,
    //         email,
    //         password,
    //     })
    // }

    static async logout<logOutRequest>(
        logOutRequest: LogOutRequest
    ): Promise<void> {
        const data = qs.stringify(logOutRequest)
        ApiService.api.post('/account/logout', data)
    }

    // static async regenerateNewTokens(
    //     refreshToken: string
    // ): Promise<AxiosResponse<AuthResponse>> {
    //     return ApiService.api.post('/Account/Refresh', { refreshToken })
    // }

    static async getAccountInfo(): Promise<AxiosResponse<UserDataResponse>> {
        return ApiService.api.get<UserDataResponse>('/account/getuserdata')
    }
}
