import { useContext } from 'react'

import { AuthContext } from '@/contexts'

import type { AuthContextValue } from '@/contexts'

/**
 * Reads the session published by `AuthProvider`.
 *
 * @returns The current user and the session actions.
 * @throws {Error} When called outside an `AuthProvider`.
 */
export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext)

  if (value === null) {
    throw new Error('useAuth must be called inside an AuthProvider.')
  }

  return value
}
