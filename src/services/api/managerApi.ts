import { API_ROUTES } from './endpoints'
import { request } from './http'

import type { CreatedResourceDto } from '@/types/createdResourceDto'

/**
 * Makes sure the signed-in caller has a manager profile, creating it the first time they sign
 * in. Safe on every sign-in: a profile that already exists is left as it is.
 *
 * @returns The id of the caller's manager profile, whether new or existing.
 * @throws {ApiError} When the API answers with an error status.
 */
export function ensureMyManager(): Promise<CreatedResourceDto> {
  return request<CreatedResourceDto>(API_ROUTES.managers.me, { method: 'POST' })
}
