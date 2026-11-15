import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import type { RefObject } from 'react'

import type { RoutePath } from '@/constants/routes'

/** One entry of the sidebar as declared in `SIDEBAR_ITEMS`, before a club is known. */
export interface SidebarItemDefinition {
  /** The entry's name, shown beside its icon. */
  label: string

  /** The club route the entry leads to, still holding the `:leagueTeamId` placeholder. */
  route: RoutePath

  /** The entry's icon. */
  icon: IconDefinition
}

/** One entry of the sidebar, resolved to the selected club. */
export interface SidebarItem {
  /** The entry's name, shown beside its icon. */
  label: string

  /** The path of this entry for the selected club. */
  to: string

  /** The entry's icon. */
  icon: IconDefinition
}

/** What `useSidebar` hands the view. */
export interface SidebarState {
  /** Whether the sidebar shows: on a club page, or while the clubs are still loading. */
  isVisible: boolean

  /** The entries to link; empty until the URL's club is known to be one the user manages. */
  items: readonly SidebarItem[]

  /** Whether the drawer is open; from the lg breakpoint the menu is part of the page. */
  isOpen: boolean

  /** The id of the links' column, which the toggle controls. */
  navId: string

  /** The toggle, which receives focus when the drawer closes. */
  toggleRef: RefObject<HTMLButtonElement | null>

  /** The element that holds the toggle and the links, outside of which focus closes the drawer. */
  rootRef: RefObject<HTMLDivElement | null>

  /** Opens the drawer when closed and closes it when open. */
  toggle: () => void

  /** Closes the drawer and returns focus to the toggle. */
  close: () => void
}
