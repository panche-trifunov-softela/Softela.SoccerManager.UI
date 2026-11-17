import type { LeagueTeamSquadPlayerDto } from '@/types/leagueTeamSquadPlayerDto'
import type { TeamSquadTarget } from '@/types/teamSquadTarget'

/** The club an opener asks the panel to show. */
export type TeamSquadProps = TeamSquadTarget

/** One row of the squad table: a player as the view shows them. */
export interface SquadPlayerRow {
  /** The player's id. */
  id: number

  /** The player's name. */
  name: string

  /** The address of the player's photo; `null` or blank when they have none. */
  imageUrl: string | null

  /** The full name of the player's main position, shown on hover. */
  positionName: string

  /** The short name of that position, for example `CB`, as the table shows it. */
  positionShortName: string

  /** The player's current rating, or `null` when they have none. */
  rating: number | null
}

/** One finished read, kept with the league team it was made for. */
export interface TeamSquadRead {
  /** The league team the read was made for. */
  leagueTeamId: number

  /** The players read, empty when the read failed. */
  players: readonly LeagueTeamSquadPlayerDto[]

  /** The fixed sentence that says the read failed, or `null` when it did not. */
  error: string | null
}

/** What `useTeamSquad` exposes to the panel. */
export interface TeamSquadState {
  /** The players to show, in the API's order. */
  rows: readonly SquadPlayerRow[]

  /** What shows under the table, or `null` when the table shows players. */
  message: string | null
}
