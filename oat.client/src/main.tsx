import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Normalize } from 'styled-normalize'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Normalize />
        <App />
    </StrictMode>
)
