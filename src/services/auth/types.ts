/** The signed-in user, as read from the access token's claims. */
export interface AuthUser {
  /** Keycloak's stable subject identifier. */
  id: string

  /** The username the user signed in with. */
  username: string

  /** Email address, empty when the account has none. */
  email: string

  /** Given name, empty when the account has none. */
  firstName: string

  /** Family name, empty when the account has none. */
  lastName: string

  /** Every realm role granted to the user, including Keycloak's defaults. */
  roles: readonly string[]
}
