import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/fredoka'
import App from './App.jsx'
import './sentry.js' // no-op if VITE_SENTRY_DSN not set — see docs/setup/sentry.md
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
