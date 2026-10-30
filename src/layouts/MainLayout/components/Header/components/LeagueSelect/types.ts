import type { HeaderDropdownItem } from '../HeaderDropdown'

/** What `useLeagueSelect` hands the view. */
export interface LeagueSelectState {
  /** The club in the URL when the user manages it, or `null` on a page without a selected club. */
  selected: HeaderDropdownItem | null

  /** The league teams the signed-in manager runs, in the backend's order. */
  items: readonly HeaderDropdownItem[]

  /** Opens the chosen club's squad page. */
  select: (id: string) => void
}
