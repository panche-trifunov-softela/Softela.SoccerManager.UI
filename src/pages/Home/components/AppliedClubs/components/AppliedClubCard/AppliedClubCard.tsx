import { ClubCard } from '@/components/ClubCard'

import { useAppliedClubCard } from './useAppliedClubCard'

import type { AppliedClubCardProps } from './types'

/**
 * One pending application: the club, its league, and the day it was made. The whole card links
 * to the league's club list.
 *
 * @param props The application the card describes.
 * @returns The rendered card.
 */
export function AppliedClubCard({ application }: AppliedClubCardProps) {
  const { appliedOn, availableTeamsPath } = useAppliedClubCard(application)

  return (
    <ClubCard
      logoUrl={application.teamLogoUrl}
      teamName={application.teamName}
      leagueName={application.leagueName}
      to={availableTeamsPath}
    >
      <span className="text-10">{appliedOn}</span>
      <span className="label text-10">Pending</span>
    </ClubCard>
  )
}
