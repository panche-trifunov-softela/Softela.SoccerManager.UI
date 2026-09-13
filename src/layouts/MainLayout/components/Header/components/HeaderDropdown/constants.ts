import type { HeaderDropdownRole } from './types'

/** The role each entry carries for a given list role. */
export const ITEM_ROLE: Record<HeaderDropdownRole, 'option' | 'menuitem'> = {
  listbox: 'option',
  menu: 'menuitem',
}
