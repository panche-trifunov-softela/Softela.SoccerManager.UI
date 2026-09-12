import type { KeycloakTokenParsed } from 'keycloak-js'

import type { AuthUser } from '../types'

/**
 * Builds the app's view of the user from the claims of a parsed token.
 *
 * @param token The parsed access token.
 * @returns The user, with every absent optional claim as an empty string.
 */
export function toAuthUser(token: KeycloakTokenParsed): AuthUser {
  return {
    id: stringClaim(token, 'sub'),
    username: stringClaim(token, 'preferred_username'),
    email: stringClaim(token, 'email'),
    firstName: stringClaim(token, 'given_name'),
    lastName: stringClaim(token, 'family_name'),
    roles: token.realm_access?.roles ?? [],
  }
}

/**
 * Reads one claim that is expected to be a string.
 *
 * @param token The parsed token.
 * @param name The claim's name.
 * @returns The claim, or an empty string when it is absent or not a string.
 */
function stringClaim(token: KeycloakTokenParsed, name: string): string {
  const value: unknown = token[name]

  return typeof value === 'string' ? value : ''
}
