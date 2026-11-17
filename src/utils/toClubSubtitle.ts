import type { LeagueTeamProfileDto } from '@/types/leagueTeamProfileDto'

/**
 * Names a club and its game world for a page subtitle.
 *
 * @param club The club to name, as the signed-in manager's own club or any club's profile.
 * @returns The team name and the league name, for example `Bayer Leverkusen – Elite Managers`.
 */
export function toClubSubtitle(
  club: Pick<LeagueTeamProfileDto, 'teamName' | 'leagueName'>,
): string {
  return `${club.teamName} – ${club.leagueName}`
}
