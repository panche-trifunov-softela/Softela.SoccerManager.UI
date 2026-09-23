import { MIN_TOKEN_VALIDITY_SECONDS } from './constants'
import { keycloak } from './keycloak'

/**
 * The renewal currently in flight, shared by every caller that arrives while
 * it runs. `keycloak-js` does not deduplicate concurrent `updateToken` calls,
 * so without this a burst of requests starts a refresh each.
 */
let inFlight: Promise<string> | null = null

/**
 * Returns an access token good for at least
 * {@link MIN_TOKEN_VALIDITY_SECONDS}, renewing it first only when it is about
 * to expire.
 *
 * A renewal that fails sends the user back through login, which is the same
 * response the adapter's own expiry handler gives — deliberately one path, so
 * a dead session cannot trigger two competing redirects.
 *
 * @returns The bearer token to send.
 * @throws {Error} When the token could not be renewed, after starting login.
 */
export function ensureFreshToken(): Promise<string> {
  inFlight ??= keycloak
    .updateToken(MIN_TOKEN_VALIDITY_SECONDS)
    .then(() => keycloak.token ?? '')
    .catch((error: unknown) => {
      void keycloak.login()
      throw error instanceof Error ? error : new Error('Token renewal failed.')
    })
    .finally(() => {
      inFlight = null
    })

  return inFlight
}
