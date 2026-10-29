import { generatePath } from 'react-router'

import { ROUTES } from '@/constants/routes'
import { formatCreatedAt } from '@/utils/formatCreatedAt'

import type { AppliedClubCardProps, AppliedClubCardState } from './types'

/**
 * Derives what the card shows from the application it was handed.
 *
 * @param application The application the card describes.
 * @returns The day the application was made, and the path to the league's club list.
 */
export function useAppliedClubCard(
  application: AppliedClubCardProps['application'],
): AppliedClubCardState {
  const appliedOn = `Applied ${formatCreatedAt(application.createdAt)}`

  const availableTeamsPath = generatePath(ROUTES.availableTeams, {
    leagueId: String(application.leagueId),
  })

  return { appliedOn, availableTeamsPath }
}
