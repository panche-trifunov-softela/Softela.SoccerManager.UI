import { createContext } from 'react'

import type { AuthContextValue } from './types'

/** The session `AuthProvider` publishes; read it through `useAuth`. */
export const AuthContext = createContext<AuthContextValue | null>(null)
