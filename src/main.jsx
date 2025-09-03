import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { SiteContextProvider } from './components/SiteContext/SiteContext'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <SiteContextProvider>
        <App />
      </SiteContextProvider>
    </BrowserRouter>
)


