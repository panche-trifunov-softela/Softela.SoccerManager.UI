import type { MyLeagueTeamManagerDto } from '@/types/myLeagueTeamManagerDto'

/**
 * Names a club and its game world for a page subtitle.
 *
 * @param club The club the signed-in manager runs.
 * @returns The team name and the league name, for example `Bayer Leverkusen – Elite Managers`.
 */
export function toClubSubtitle(club: MyLeagueTeamManagerDto): string {
  return `${club.teamName} – ${club.leagueName}`
}
