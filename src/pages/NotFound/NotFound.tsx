import { Link } from 'react-router'

import { ROUTES } from '@/constants/routes'

/**
 * Catch-all page for a URL no route matches.
 *
 * @returns The rendered page with a link back to the landing page.
 */
export function NotFound() {
  return (
    <>
      <h1>Page not found</h1>
      <Link to={ROUTES.home}>Back to home</Link>
    </>
  )
}
