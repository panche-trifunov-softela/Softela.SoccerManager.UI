import type { HeaderDropdownItem } from '../HeaderDropdown'

/** A league a user can play in. Component-local until the API defines the record. */
export interface League {
  /** Identifies the league. */
  id: string

  /** The league's display name. */
  name: string
}

/** What `useLeagueSelect` hands the view. */
export interface LeagueSelectState {
  /** The league currently chosen. */
  selected: League

  /** The leagues, in display order. */
  items: readonly HeaderDropdownItem[]

  /** Sets the chosen league by id. */
  select: (id: string) => void
}
