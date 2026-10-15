import { ApiError } from './apiError'

/**
 * Says why a request failed, in words the reader can act on.
 *
 * @param cause What the request rejected with.
 * @param fallback What to say when the request got no answer from the API.
 * @returns The API's validation reasons on one line for a 400, the API's own title for any other
 * error status, or the fallback.
 */
export function toErrorMessage(cause: unknown, fallback: string): string {
  if (!(cause instanceof ApiError)) return fallback

  const reasons = Object.values(cause.validationErrors ?? {}).flat()

  return reasons.length > 0 ? reasons.join(' ') : cause.message
}
