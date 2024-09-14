import { makeAutoObservable } from 'mobx'
import { AuthData } from '../models/AuthData'
import { AuthService } from '../services/authService'
import { TokenRequest } from '../models/Requests/TokenRequest'

export interface IAuthStore {
    authData: AuthData
    setAuthData: (authData: AuthData) => void
    login: (username: string, password: string) => Promise<void>
}

class AuthStore implements IAuthStore {
    private _authData: AuthData

    constructor() {
        makeAutoObservable(this)
        this._authData = localStorage.authData
            ? JSON.parse(localStorage.authData)
            : {}
    }

    get authData(): AuthData {
        return this._authData
    }

    setAuthData = (authData: AuthData) => {
        this._authData = authData
        localStorage.authData = JSON.stringify(authData)
    }

    login = async (username: string, password: string) => {
        try {
            const tokenRequest: TokenRequest = {
                username: username,
                password: password,
                grant_type: 'password',
                client_id: 'default-client',
                client_secret: '499D56FA-B47B-5199-BA61-B298D431C318',
                refresh_token: '',
            }
            console.log(tokenRequest)
            AuthService.login(tokenRequest)
                .then((response) => {
                    console.log(response)
                    let authData: AuthData = {
                        accessToken: response.data.access_token,
                        refreshToken: response.data.refresh_token,
                    }
                    this.setAuthData(authData)
                    console.log(response.data)
                })
                .catch((error) => {
                    console.error(error)
                })
        } catch (error) {
            console.error('Login failed', error)
        }
    }

    // logout = async () => {
    //     try {
    //         await AuthService.logout();
    //         this.setAuthData({} as AuthData);
    //     } catch (error) {
    //         console.error('Logout failed', error);
    //     }
    // }
}

const authStore = new AuthStore()
export default authStore
