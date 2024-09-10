import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import AppRouter from './components/common/AppRouting'
import { RouteNames } from './router'
import HomePage from './pages/HomePage'

function App() {
    return (
        <>
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </>
    )
}

export default App
