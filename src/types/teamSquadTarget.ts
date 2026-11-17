import type { PlayerProfileTarget } from './playerProfileTarget'

/** The club an opener asks the squad panel to show. */
export interface TeamSquadTarget {
  /** The identifier of the club's league team, whose squad is read. */
  leagueTeamId: number

  /** The name of the club, shown beside its crest. */
  name: string

  /** The address of the club's logo, or `null` when it has none. */
  logoUrl: string | null

  /**
   * Called with the player a row's name was pressed for; the names are plain text when it is left
   * out.
   */
  onOpenPlayer?: (target: PlayerProfileTarget) => void
}
