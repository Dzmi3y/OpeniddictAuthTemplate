import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './Index.css'
import { Normalize } from 'styled-normalize'
import React from 'react'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Normalize />
        <App />
    </StrictMode>
)
