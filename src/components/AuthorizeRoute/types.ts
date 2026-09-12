import type { RealmRole } from '@/constants/roles'

/** Props of `AuthorizeRoute`. */
export interface AuthorizeRouteProps {
  /** Realm roles the user must all hold; none means being signed in is enough. */
  roles?: readonly RealmRole[]
}

/** What `useAuthorizeRoute` resolves the current user to. */
export type AuthorizeRouteStatus = 'authorized' | 'forbidden' | 'unauthenticated'
