import { RouterProvider } from 'react-router/dom'

import { ToastHost } from '@/components/ToastHost'
import { AuthProvider } from '@/contexts'
import { router } from '@/router'

/**
 * Application root: publishes the session, hands the route tree to React
 * Router and hosts the app-wide toast beside it, so a toast outlives a
 * navigation. Further app-wide providers wrap the router here as they arrive.
 *
 * @returns The routed application.
 */
function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />

      <ToastHost />
    </AuthProvider>
  )
}

export default App
