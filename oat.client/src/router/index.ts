import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
export interface IRoute {
    path: string;
    element: React.ComponentType;
  }

export enum RouteNames {
    LOGIN = '/login',
    REGISTER = '/register',
    PROFILE = '/profile',
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
  {
    path: RouteNames.HOME,
    element: HomePage,
  }
]
export const privateRoutes: IRoute[] = [
    {
      path: RouteNames.PROFILE,
      element: ProfilePage,
    },
    {
      path: RouteNames.HOME,
      element: HomePage,
    }
]

