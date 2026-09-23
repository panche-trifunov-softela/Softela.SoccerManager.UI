import type { AppConfig } from './types'
import { isAppConfig } from './utils'

/**
 * Reads the runtime configuration that `public/config.js` published on
 * `window`.
 *
 * @returns The validated configuration.
 * @throws {Error} When `config.js` did not load or publishes the wrong shape.
 */
export function readAppConfig(): AppConfig {
  const value = window.APP_CONFIG

  if (!isAppConfig(value)) {
    throw new Error(
      'Runtime configuration is missing or malformed: public/config.js must set window.APP_CONFIG with a keycloak section holding url, realm and clientId, and an api section holding baseUrl.',
    )
  }

  return value
}

/** The runtime configuration, read once when the module first loads. */
export const appConfig = readAppConfig()
