import { useMemo } from 'react'

import { keycloak, toAuthUser } from '@/services/auth'

import { AuthContext } from './AuthContext'

import type { AuthContextValue, AuthProviderProps } from './types'

/**
 * Publishes the initialised Keycloak session to the tree below.
 *
 * The value is built once from the token present at mount, so a token renewal
 * does not re-render consumers; the role check reads the adapter live.
 *
 * @param props The provider's props.
 * @returns The provider element.
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const value = useMemo<AuthContextValue>(() => {
    const user = keycloak.authenticated && keycloak.tokenParsed ? toAuthUser(keycloak.tokenParsed) : null

    return {
      user,
      isAuthenticated: user !== null,
      hasRole: (role) => keycloak.hasRealmRole(role),
      login: () => keycloak.login(),
      logout: () => keycloak.logout({ redirectUri: `${window.location.origin}/` }),
    }
  }, [])

  return <AuthContext value={value}>{children}</AuthContext>
}
