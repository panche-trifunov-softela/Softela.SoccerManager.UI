import type { LeagueDto } from '@/types/leagueDto'

/** What `AvailableLeagues` is handed. */
export interface AvailableLeaguesProps {
  /** The search the leagues are narrowed by, or `null` for the newest ones. */
  searchTerm: string | null
}

/** One row of the table: a league as the view shows it. */
export interface AvailableLeagueRow {
  /** The league's id. */
  id: number

  /** The league's name. */
  name: string

  /** The day the league was created, written in the reader's locale. */
  created: string
}

/** One finished read, kept with the search it was made for. */
export interface AvailableLeaguesRead {
  /** The search the read was made for. */
  searchTerm: string | null

  /** The leagues read, empty when the read failed. */
  leagues: readonly LeagueDto[]

  /** Why the read failed, or `null` when it did not. */
  error: string | null
}

/** What `useAvailableLeagues` exposes to the view. */
export interface AvailableLeaguesState {
  /** The rows to show, in the API's order. */
  rows: readonly AvailableLeagueRow[]

  /** Whether the read for the current search is still in flight. */
  isLoading: boolean

  /** Why the read failed, or `null` when it did not. */
  error: string | null

  /** Whether the read succeeded and found nothing. */
  isEmpty: boolean
}
