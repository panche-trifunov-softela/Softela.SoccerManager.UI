import { useEffect } from 'react'

import { useAuth } from '@/hooks/useAuth'

import type { AuthorizeRouteProps, AuthorizeRouteStatus } from './types'

/**
 * Decides whether the current user may see the routes below the guard.
 *
 * @param roles Realm roles the user must all hold.
 * @returns The status; a user without a session is sent to login as a side effect.
 */
export function useAuthorizeRoute(roles: AuthorizeRouteProps['roles'] = []): AuthorizeRouteStatus {
  const { isAuthenticated, hasRole, login } = useAuth()

  let status: AuthorizeRouteStatus = 'authorized'
  if (!isAuthenticated) status = 'unauthenticated'
  else if (!roles.every((role) => hasRole(role))) status = 'forbidden'

  useEffect(() => {
    if (status === 'unauthenticated') void login()
  }, [status, login])

  return status
}
