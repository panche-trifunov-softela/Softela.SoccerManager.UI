/** The realm roles Keycloak can grant a user. */
export const ROLES = {
  /** May do everything, including administration. */
  admin: 'admin',

  /** A standard signed-in user. */
  user: 'user',
} as const

/** One of the realm roles in `ROLES`. */
export type RealmRole = (typeof ROLES)[keyof typeof ROLES]
