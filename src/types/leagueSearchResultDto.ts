import type { LeagueSearchPlayerGroupDto } from './leagueSearchPlayerGroupDto'
import type { LeagueSearchTeamGroupDto } from './leagueSearchTeamGroupDto'

/**
 * What a league search found: the players and the clubs whose names contain the term.
 *
 * Mirrors the response of `GET /api/league-teams/{id}/search`.
 */
export interface LeagueSearchResultDto {
  /** The players that matched, with the club each is registered at, if any. */
  players: LeagueSearchPlayerGroupDto

  /** The clubs of the league that matched. */
  teams: LeagueSearchTeamGroupDto
}
