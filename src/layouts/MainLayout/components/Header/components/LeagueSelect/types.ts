import type { HeaderDropdownItem } from '../HeaderDropdown'

/** What `useLeagueSelect` hands the view. */
export interface LeagueSelectState {
  /** The league team currently chosen, or `null` while there is none to choose from. */
  selected: HeaderDropdownItem | null

  /** The league teams the signed-in manager runs, in the backend's order. */
  items: readonly HeaderDropdownItem[]

  /** Sets the chosen league team by id. */
  select: (id: string) => void
}
