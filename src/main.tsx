import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import '@/styles/main.scss'
import App from '@/App.tsx'
import { initAuth } from '@/services/auth'

// Font Awesome's stylesheet is imported above with the app's own CSS, so the library must not
// inject a second copy at run time.
config.autoAddCss = false

await initAuth()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
