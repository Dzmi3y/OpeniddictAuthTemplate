import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouting'
import React from 'react'
import { Provider } from 'mobx-react'
import authStore from './store/AuthStore'

function App() {
    return (
        <Provider authStore={authStore}>
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </Provider>
    )
}

export default App
