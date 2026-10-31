import { ClubCard } from '@/components/ClubCard'

import { ManagerPhoto } from './components/ManagerPhoto'
import { useLeagueApplicationCard } from './useLeagueApplicationCard'

import type { LeagueApplicationCardProps } from './types'

/**
 * One application made for a club in the signed-in manager's leagues: the club, its league, the
 * applicant's photo, the day the application was made, and the actions it is handed, at the end of
 * the footer. The card links nowhere.
 *
 * @param props The application the card describes, and the actions at the end of its footer.
 * @returns The rendered card.
 */
export function LeagueApplicationCard({ application, actions }: LeagueApplicationCardProps) {
  const { appliedOn } = useLeagueApplicationCard(application)

  return (
    <ClubCard
      logoUrl={application.teamLogoUrl}
      teamName={application.teamName}
      leagueName={application.leagueName}
      aside={<ManagerPhoto imageUrl={application.managerImageUrl} />}
    >
      <span className="text-10">{appliedOn}</span>
      {actions}
    </ClubCard>
  )
}
