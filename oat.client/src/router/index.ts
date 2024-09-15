import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import HomePage from '../pages/HomePage'
export interface IRoute {
    path: string
    element: React.FC<any>
}

export enum RouteNames {
    LOGIN = '/login',
    REGISTER = '/register',
    HOME = '/home',
    ANY = '*',
}

export const publicRoutes: IRoute[] = [
    {
        path: RouteNames.LOGIN,
        element: LoginPage,
    },
    {
        path: RouteNames.REGISTER,
        element: RegisterPage,
    },
]
export const privateRoutes: IRoute[] = [
    {
        path: RouteNames.HOME,
        element: HomePage,
    },
]
