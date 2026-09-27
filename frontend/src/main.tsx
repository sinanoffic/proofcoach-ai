import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ProofProvider } from './context/ProofContext'
import { ThemeProvider } from './context/ThemeContext'
import App from './App'
import './styles.css'
import '@xyflow/react/dist/style.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode><BrowserRouter><ThemeProvider><ProofProvider><App /></ProofProvider></ThemeProvider></BrowserRouter></StrictMode>,
)
