import type { AppConfig } from '../types'

/**
 * Narrows an unknown value to `AppConfig`.
 *
 * @param value The candidate, normally `window.APP_CONFIG`.
 * @returns Whether it carries a `keycloak` section whose `url`, `realm` and
 * `clientId` are all non-empty strings.
 */
export function isAppConfig(value: unknown): value is AppConfig {
  if (typeof value !== 'object' || value === null) return false

  const { keycloak } = value as { keycloak?: unknown }
  if (typeof keycloak !== 'object' || keycloak === null) return false

  const { url, realm, clientId } = keycloak as Record<string, unknown>

  return [url, realm, clientId].every((field) => typeof field === 'string' && field.length > 0)
}
