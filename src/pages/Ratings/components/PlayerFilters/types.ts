import type { ChangeEventHandler } from 'react'

import type { NationalTeamDto } from '@/types/nationalTeamDto'
import type { PlayerSearchQuery } from '@/types/playerSearchQuery'
import type { PositionDto } from '@/types/positionDto'
import type { TeamDto } from '@/types/teamDto'

/**
 * A change to the filters: the ones it names take the new value, and a
 * member set to `undefined` clears that filter.
 */
export type PlayerFilterChange = Partial<
  Pick<PlayerSearchQuery, 'positionId' | 'teamId' | 'nationalTeamId' | 'minRating'>
>

/** What `PlayerFilters` is handed. */
export interface PlayerFiltersProps {
  /** The search the page is showing; the selects show its filters. */
  query: PlayerSearchQuery

  /** Called with the typed value each time the name search is submitted. */
  onSearch: (value: string) => void

  /** Called with the filter that changed. */
  onFilter: (change: PlayerFilterChange) => void
}

/** The lists the selects offer, and the line that says when they could not be read. */
export interface FilterOptions {
  /** The positions to filter by, in the API's order. */
  positions: readonly PositionDto[]

  /** The clubs to filter by, in the API's order. */
  teams: readonly TeamDto[]

  /** The national teams to filter by, in the API's order. */
  nationalTeams: readonly NationalTeamDto[]

  /** The fixed sentence that says the lists could not be read, or `null` when they could. */
  error: string | null
}

/** What `usePlayerFilters` exposes to the view. */
export interface PlayerFiltersState extends FilterOptions {
  /** Applies the position chosen in its select. */
  onPositionChange: ChangeEventHandler<HTMLSelectElement>

  /** Applies the club chosen in its select. */
  onTeamChange: ChangeEventHandler<HTMLSelectElement>

  /** Applies the national team chosen in its select. */
  onNationalTeamChange: ChangeEventHandler<HTMLSelectElement>

  /** Applies the lowest rating chosen in its select. */
  onMinRatingChange: ChangeEventHandler<HTMLSelectElement>
}
