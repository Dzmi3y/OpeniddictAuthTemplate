import { AxiosResponse } from 'axios'
import qs from 'qs'
import { ApiService } from './apiService'
import { TokenRequest } from '../models/Requests/TokenRequest'
import { TokenResponse } from '../models/Responses/TokenResponse'

export class AuthService {
    static async login(
        tokenRequest: TokenRequest
    ): Promise<AxiosResponse<TokenResponse>> {
        console.log(tokenRequest)
        const data = qs.stringify(tokenRequest)
        console.log(data)

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

    // static async logout(refreshToken: string): Promise<void> {
    //     return ApiService.api.post('/Account/SignOut', { refreshToken })
    // }

    // static async regenerateNewTokens(
    //     refreshToken: string
    // ): Promise<AxiosResponse<AuthResponse>> {
    //     return ApiService.api.post('/Account/Refresh', { refreshToken })
    // }

    // static async getAccountInfo(): Promise<AxiosResponse<AccountResponse>> {
    //     return ApiService.api.get('/Account/Me')
    // }
}
