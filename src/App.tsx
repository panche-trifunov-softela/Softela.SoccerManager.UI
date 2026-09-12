import { RouterProvider } from 'react-router/dom'

import { AuthProvider } from '@/contexts'
import { router } from '@/router'

/**
 * Application root: publishes the session and hands the route tree to React
 * Router. Further app-wide providers wrap the router here as they arrive.
 *
 * @returns The routed application.
 */
function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
