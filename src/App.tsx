import { RouterProvider } from 'react-router/dom'

import { router } from '@/router'

/**
 * Application root: hands the route tree to React Router. Providers every
 * page needs wrap the router here as they arrive.
 *
 * @returns The routed application.
 */
function App() {
  return <RouterProvider router={router} />
}

export default App
