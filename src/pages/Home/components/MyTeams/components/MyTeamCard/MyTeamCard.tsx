import { ClubCard } from '@/components/ClubCard'

import { useMyTeamCard } from './useMyTeamCard'

import type { MyTeamCardProps } from './types'

/**
 * One team: the club managed, the league it plays in, and the span the
 * tenure covers. The whole card links to the team's news feed.
 *
 * @param props The team the card describes.
 * @returns The rendered card.
 */
export function MyTeamCard({ team }: MyTeamCardProps) {
  const { tenure, newsFeedPath } = useMyTeamCard(team)

  return (
    <ClubCard
      logoUrl={team.teamLogoUrl}
      teamName={team.teamName}
      leagueName={team.leagueName}
      to={newsFeedPath}
    >
      <span className="text-10">{tenure}</span>
      {team.isCurrent && <span className="label text-10">Current</span>}
    </ClubCard>
  )
}
