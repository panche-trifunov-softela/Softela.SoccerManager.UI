import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import '@/styles/main.scss'
import App from '@/App.tsx'
import { ensureMyManager } from '@/services/api'
import { initAuth } from '@/services/auth'

// Font Awesome's stylesheet is imported above with the app's own CSS, so the library must not
// inject a second copy at run time.
config.autoAddCss = false

await initAuth()

// Creates the signed-in caller's manager profile on their first sign-in. It runs in the
// background, so the first screen does not wait; a failure is retried on the next page load.
void ensureMyManager().catch(() => undefined)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
