import { ApiError } from '@/services/api'

import type { SquadPlayerProfileFailure } from '../types'

/**
 * Sorts a failed read into the cases the panel answers differently.
 *
 * @param cause What the request rejected with.
 * @returns `not-found` for a 404, `forbidden` for a 403, and `failed` for anything else.
 */
export function toFailure(cause: unknown): SquadPlayerProfileFailure {
  if (cause instanceof ApiError) {
    if (cause.status === 404) return 'not-found'

    if (cause.status === 403) return 'forbidden'
  }

  return 'failed'
}
