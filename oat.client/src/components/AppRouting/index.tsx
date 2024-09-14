import { Navigate, Route, Routes } from 'react-router-dom'
import { privateRoutes, publicRoutes, RouteNames } from '../../router'
import React from 'react'
import { IAuthStore } from '../../store/AuthStore'
import { inject, observer } from 'mobx-react'

const AppRouter: React.FC<{ authStore: IAuthStore }> = inject('authStore')(
    observer(({ authStore }) => {
        const authToken = false //todo

        return authToken ? (
            <Routes>
                {privateRoutes.map((route) => (
                    <Route
                        path={route.path}
                        element={<route.element />}
                        key={route.path}
                    />
                ))}
                <Route
                    path={RouteNames.ANY}
                    element={<Navigate to={RouteNames.HOME} replace />}
                />
            </Routes>
        ) : (
            <Routes>
                {publicRoutes.map((route) => (
                    <Route
                        path={route.path}
                        element={<route.element />}
                        key={route.path}
                    />
                ))}
                <Route
                    path={RouteNames.ANY}
                    element={<Navigate to={RouteNames.LOGIN} replace />}
                />
            </Routes>
        )
    })
)

export default AppRouter
