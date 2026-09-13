import { useCallback } from 'react'

import { useAuth } from '@/hooks/useAuth'

import type { HeaderState } from './types'

/**
 * Reads the signed-in user and exposes a sign-out action for the header.
 *
 * @returns The username to show and a way to sign out.
 */
export function useHeader(): HeaderState {
  const { user, logout } = useAuth()

  const signOut = useCallback(() => {
    void logout()
  }, [logout])

  return { username: user?.username ?? '', signOut }
}
