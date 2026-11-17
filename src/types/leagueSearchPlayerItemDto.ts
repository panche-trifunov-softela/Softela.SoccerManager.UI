/**
 * One player a league search found, with the club the player is registered at in the league, if
 * any.
 *
 * Mirrors an item of `players` in `GET /api/league-teams/{id}/search`.
 */
export interface LeagueSearchPlayerItemDto {
  /** The identifier of the player. */
  playerId: number

  /** The name of the player. */
  name: string

  /** The URL of the player's photo, or `null` when they have none. */
  imageUrl: string | null

  /** The player's current rating, or `null` when they have none. */
  rating: number | null

  /** The full name of the player's main position; empty when the player has none. */
  positionName: string

  /** The short name of that position, for example `CB`; empty when the player has none. */
  positionShortName: string

  /** The identifier of the league team the player is registered at, or `null` for a free agent. */
  leagueTeamId: number | null

  /** The name of that league team, or `null` for a free agent. */
  teamName: string | null
}
