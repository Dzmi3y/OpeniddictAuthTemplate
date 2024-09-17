import { AxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'qs'
import { ApiService } from './apiService'
import { TokenRequest } from '../models/Requests/TokenRequest'
import { TokenResponse } from '../models/Responses/TokenResponse'
import { UserDataResponse } from '../models/Responses/UserDataResponse'
import { LogOutRequest } from '../models/Requests/LogOutRequest'
import { ApiPathEnum } from '../config'

export class AuthService {
    static async login(
        tokenRequest: TokenRequest
    ): Promise<AxiosResponse<TokenResponse>> {
        const data = qs.stringify(tokenRequest)
        let axiosRequestConfig: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
        return ApiService.api.post<TokenResponse>(
            ApiPathEnum.GETTOKEN,
            data,
            axiosRequestConfig
        )
    }

    static async register<RegisterRequest>(
        registerRequest: RegisterRequest
    ): Promise<AxiosResponse> {
        return ApiService.api.post(ApiPathEnum.REGISTER, registerRequest)
    }

    static async logout<logOutRequest>(
        logOutRequest: LogOutRequest
    ): Promise<void> {
        let axiosRequestConfig: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
        const data = qs.stringify(logOutRequest)
        ApiService.api.post(ApiPathEnum.LOGOUT, data, axiosRequestConfig)
    }

    static async getAccountInfo(): Promise<AxiosResponse<UserDataResponse>> {
        return ApiService.api.get<UserDataResponse>(ApiPathEnum.GETUSERDATA)
    }
}
