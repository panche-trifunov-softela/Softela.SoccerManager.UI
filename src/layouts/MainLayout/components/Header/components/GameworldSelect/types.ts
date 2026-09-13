import type { HeaderDropdownItem } from '../HeaderDropdown'

/** A gameworld a user can play in. Component-local until the API defines the record. */
export interface Gameworld {
  /** Identifies the gameworld. */
  id: string

  /** The gameworld's display name. */
  name: string
}

/** What `useGameworldSelect` hands the view. */
export interface GameworldSelectState {
  /** The gameworld currently chosen. */
  selected: Gameworld

  /** The gameworlds, in display order. */
  items: readonly HeaderDropdownItem[]

  /** Sets the chosen gameworld by id. */
  select: (id: string) => void
}
