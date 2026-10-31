import { formatCreatedAt } from '@/utils/formatCreatedAt'

import { toApplicantName } from '../../utils'

import type { LeagueApplicationCardProps, LeagueApplicationCardState } from './types'

/**
 * Derives what the card shows from the application it was handed.
 *
 * @param application The application the card describes.
 * @returns The day the application was made, and the applicant's name.
 */
export function useLeagueApplicationCard(
  application: LeagueApplicationCardProps['application'],
): LeagueApplicationCardState {
  const appliedOn = `Applied ${formatCreatedAt(application.createdAt)}`
  const applicantName = toApplicantName(application)

  return { appliedOn, applicantName }
}
