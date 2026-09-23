import type { AppConfig } from '../types'

/**
 * Narrows an unknown value to `AppConfig`.
 *
 * @param value The candidate, normally `window.APP_CONFIG`.
 * @returns Whether it carries a `keycloak` section holding `url`, `realm` and
 * `clientId`, and an `api` section holding `baseUrl`, all non-empty strings.
 */
export function isAppConfig(value: unknown): value is AppConfig {
  if (typeof value !== 'object' || value === null) return false

  const { keycloak, api } = value as { keycloak?: unknown; api?: unknown }
  if (typeof keycloak !== 'object' || keycloak === null) return false
  if (typeof api !== 'object' || api === null) return false

  const { url, realm, clientId } = keycloak as Record<string, unknown>
  const { baseUrl } = api as Record<string, unknown>

  return [url, realm, clientId, baseUrl].every(
    (field) => typeof field === 'string' && field.length > 0,
  )
}
