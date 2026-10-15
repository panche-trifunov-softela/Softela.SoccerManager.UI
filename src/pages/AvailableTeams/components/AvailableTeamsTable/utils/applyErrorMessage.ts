import { ApiError } from '@/services/api'

import { APPLY_FAILED_MESSAGE } from '../constants'

/**
 * Says why an application failed, in words the reader can act on.
 *
 * @param cause What the application rejected with.
 * @returns The API's validation reasons on one line for a 400, the API's own title for any other
 * error status, or a generic sentence when the request got no answer.
 */
export function applyErrorMessage(cause: unknown): string {
  if (!(cause instanceof ApiError)) return APPLY_FAILED_MESSAGE

  const reasons = Object.values(cause.validationErrors ?? {}).flat()

  return reasons.length > 0 ? reasons.join(' ') : cause.message
}
