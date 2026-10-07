import { Link } from 'react-router'

import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/hooks/useAuth'

/**
 * Shown to a signed-in user who lacks a role the route requires.
 *
 * @returns The rendered page, with a way home and a way out.
 */
export function Forbidden() {
  const { logout } = useAuth()

  return (
    <div className="page_container d-flex flex-column align-items-start g-20">
      <h1>Access denied</h1>
      <p>Your account does not have access to this page.</p>
      <Link to={ROUTES.home}>Back to home</Link>
      <button type="button" className="btn" onClick={() => void logout()}>
        Sign out
      </button>
    </div>
  )
}
