import type { ReactNode } from 'react'

import type { RealmRole } from '@/constants/roles'
import type { AuthUser } from '@/services/auth'

/** What `useAuth` hands to a consumer. */
export interface AuthContextValue {
  /** The signed-in user, or `null` when nobody is signed in. */
  user: AuthUser | null

  /** Whether a user is signed in; `user` is non-null exactly then. */
  isAuthenticated: boolean

  /** Whether the signed-in user holds the given realm role. */
  hasRole: (role: RealmRole) => boolean

  /** Sends the browser to the Keycloak login page. */
  login: () => Promise<void>

  /** Ends the session and returns to the app's origin, signed out. */
  logout: () => Promise<void>
}

/** Props of `AuthProvider`. */
export interface AuthProviderProps {
  /** The tree whose components may call `useAuth`. */
  children: ReactNode
}
