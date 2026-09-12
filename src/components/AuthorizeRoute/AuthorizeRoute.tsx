import { Outlet } from 'react-router'

import { Forbidden } from '@/pages/Forbidden'

import { useAuthorizeRoute } from './useAuthorizeRoute'

import type { AuthorizeRouteProps } from './types'

/**
 * Layout route that admits only a signed-in user holding every role in
 * `roles`. A missing role shows the forbidden page; no session renders nothing
 * while the login redirect happens.
 *
 * @param props The route's props.
 * @returns The child routes, the forbidden page, or nothing.
 */
export function AuthorizeRoute({ roles }: AuthorizeRouteProps) {
  const status = useAuthorizeRoute(roles)

  if (status === 'unauthenticated') return null
  if (status === 'forbidden') return <Forbidden />

  return <Outlet />
}
