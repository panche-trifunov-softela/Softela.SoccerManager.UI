import { formatCreatedAt } from '@/utils/formatCreatedAt'

import type { LeagueApplicationCardProps, LeagueApplicationCardState } from './types'

/**
 * Derives what the card shows from the application it was handed.
 *
 * @param application The application the card describes.
 * @returns The day the application was made.
 */
export function useLeagueApplicationCard(
  application: LeagueApplicationCardProps['application'],
): LeagueApplicationCardState {
  const appliedOn = `Applied ${formatCreatedAt(application.createdAt)}`

  return { appliedOn }
}
