/**
 * One player of a League player search, seen from one League: the club he is registered at in it,
 * or none for a free agent.
 *
 * Mirrors an item of `GET /api/league-teams/{id}/league-players`. The date of birth arrives as
 * `yyyy-MM-dd`.
 */
export interface PlayersInLeagueItemDto {
  /** The identifier of the player. */
  playerId: number

  /** The name of the player. */
  name: string

  /** The player's date of birth, as `yyyy-MM-dd`. */
  dateOfBirth: string

  /** The player's current rating, or `null` when he has none. */
  rating: number | null

  /**
   * The player's market value: the in-game value for a registered player, the real-world value
   * for a free agent.
   */
  value: number

  /**
   * The player's wage: the in-game wage for a registered player, the real-world wage for a free
   * agent.
   */
  wage: number

  /** The player's image, or `null` when there is none. */
  imageUrl: string | null

  /** The identifier of the club he is registered at in the League, or `null` for a free agent. */
  leagueTeamId: number | null

  /** The name of that club, or `null` for a free agent. */
  teamName: string | null

  /** The identifier of the player's national team, or `null` when the player has none. */
  nationalTeamId: number | null

  /** The name of that national team, or `null` when the player has none. */
  nationalTeamName: string | null

  /** The identifier of the player's main position, or 0 when he has none. */
  positionId: number

  /** The name of that position, or an empty string when he has none. */
  positionName: string

  /** The short name of that position, for example `CB`, or an empty string when he has none. */
  positionShortName: string
}
