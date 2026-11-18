import { Navigate, Outlet } from 'react-router'

import { useManagedClubRoute } from './useManagedClubRoute'

/**
 * Layout route that admits only the manager of the club in the address. Any other club's
 * manager-only page, opened by its address, is replaced by that club's Squad page.
 *
 * The sidebar lists these pages by `access`: each is reached from a `manager` entry or from a
 * `manager` group's sub-link (the news feed has none yet), and the route of such an entry or
 * sub-link belongs under this guard.
 *
 * @returns The child routes, the Squad page redirect, the line for a failed read of the user's
 * clubs, or nothing while they load.
 */
export function ManagedClubRoute() {
  const { status, redirectTo, error } = useManagedClubRoute()

  if (status === 'pending') return null

  if (status === 'failed') return <p className="label">{error}</p>

  if (status === 'redirect') return <Navigate to={redirectTo} replace />

  return <Outlet />
}
