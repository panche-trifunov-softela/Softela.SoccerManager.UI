import type { AvailableLeagueTeamDto } from '@/types/availableLeagueTeamDto'
import type { LeagueDto } from '@/types/leagueDto'

import type { AvailableTeamRow } from './components/AvailableTeamsTable'

/** One finished read, kept with the league it was made for. */
export interface AvailableTeamsRead {
  /** The league the read was made for. */
  leagueId: number

  /** The league read, or `null` when the read failed. */
  league: LeagueDto | null

  /** The clubs read, empty when the read failed. */
  teams: readonly AvailableLeagueTeamDto[]

  /** Why the read failed, or `null` when it did not. */
  error: string | null
}

/** What `useAvailableTeams` exposes to the page. */
export interface AvailableTeamsState {
  /** The game world's name, or `null` until it is read. */
  leagueName: string | null

  /** The clubs to show, in the API's order. */
  rows: readonly AvailableTeamRow[]

  /** What shows instead of the table, or `null` when the table shows clubs. */
  message: string | null
}
