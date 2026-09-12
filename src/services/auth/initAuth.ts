import { keycloak } from './keycloak'

/** Remaining validity, in seconds, below which an expiring token is renewed. */
const MIN_TOKEN_VALIDITY_SECONDS = 30

/**
 * Initialises the Keycloak adapter; must complete before the app renders.
 *
 * Flow:
 * 1. `login-required` sends a visitor without a session to the Keycloak login
 *    page and brings them back with one, so the app never renders signed out.
 * 2. Authorization Code with PKCE, no login iframe: the session is kept alive
 *    by renewing the token when it expires.
 * 3. A renewal that fails sends the user back through login.
 *
 * @returns Whether the user is authenticated once initialisation completes.
 */
export function initAuth(): Promise<boolean> {
  keycloak.onTokenExpired = () => {
    void keycloak.updateToken(MIN_TOKEN_VALIDITY_SECONDS).catch(() => keycloak.login())
  }

  return keycloak.init({
    onLoad: 'login-required',
    pkceMethod: 'S256',
    checkLoginIframe: false,
  })
}
