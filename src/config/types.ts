/** What `public/config.js` publishes on `window.APP_CONFIG`. */
export interface AppConfig {
  /** Coordinates the Keycloak adapter is created with. */
  keycloak: KeycloakConfig
}

/** Where the realm lives and which client the app signs in through. */
export interface KeycloakConfig {
  /** Base URL of the Keycloak server, without the realm path. */
  url: string

  /** Name of the realm. */
  realm: string

  /** The public client the app authenticates as. */
  clientId: string
}

declare global {
  interface Window {
    /** Published by `public/config.js` before the app's own script runs. */
    APP_CONFIG?: unknown
  }
}
