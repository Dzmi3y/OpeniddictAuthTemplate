import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { IRoute, privateRoutes, publicRoutes, RouteNames } from '../../router'
import React, { useEffect, useState } from 'react'
import { IAuthStore } from '../../store/AuthStore'
import { inject, observer } from 'mobx-react'

const AppRouter: React.FC<{ authStore?: IAuthStore }> = inject('authStore')(
    observer(({ authStore }) => {
        const token = authStore?.authData.accessToken
        const routes = token ? privateRoutes : publicRoutes
        return (
            <Routes>
                {routes.map((route) => (
                    <Route
                        path={route.path}
                        element={<route.element />}
                        key={route.path}
                    />
                ))}
                <Route
                    path={RouteNames.ANY}
                    element={
                        token ? (
                            <Navigate to={RouteNames.HOME} replace />
                        ) : (
                            <Navigate to={RouteNames.LOGIN} replace />
                        )
                    }
                />
            </Routes>
        )
    })
)

export default AppRouter
