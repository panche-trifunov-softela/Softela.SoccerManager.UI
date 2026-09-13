import type { RoutePath } from '@/constants/routes'

import type { HeaderDropdownItem } from '../HeaderDropdown'

/** One entry the settings menu lists. */
export interface SettingsMenuItem extends HeaderDropdownItem {
  /** Route the entry navigates to. */
  path: RoutePath
}

/** What `useSettingsMenu` hands the view. */
export interface SettingsMenuState {
  /** The entries, in display order. */
  items: readonly SettingsMenuItem[]

  /** Navigates to the chosen entry's route. */
  select: (id: string) => void
}
