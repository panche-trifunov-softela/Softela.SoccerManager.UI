import { ClubCard } from '@/components/ClubCard'

import { ManagerPhoto } from './components/ManagerPhoto'
import { useLeagueApplicationCard } from './useLeagueApplicationCard'

import styles from './LeagueApplicationCard.module.scss'

import type { LeagueApplicationCardProps } from './types'

/**
 * One application made for a club in the signed-in manager's leagues. The card links nowhere.
 *
 * - The header shows the club, its league, and the applicant's photo with their name under it; the
 *   photo stands alone when the name is not known.
 * - The footer shows the day the application was made, then the actions the card is handed.
 *
 * @param props The application the card describes, and the actions at the end of its footer.
 * @returns The rendered card.
 */
export function LeagueApplicationCard({ application, actions }: LeagueApplicationCardProps) {
  const { appliedOn, applicantName } = useLeagueApplicationCard(application)

  return (
    <ClubCard
      logoUrl={application.teamLogoUrl}
      teamName={application.teamName}
      leagueName={application.leagueName}
      aside={
        <div className={`d-flex flex-column align-items-center g-4 ${styles.applicant}`}>
          <ManagerPhoto imageUrl={application.managerImageUrl} />
          {applicantName !== null && (
            <p className={`text-12 text-center ${styles.name}`}>{applicantName}</p>
          )}
        </div>
      }
    >
      <span className="text-10">{appliedOn}</span>
      {actions}
    </ClubCard>
  )
}
