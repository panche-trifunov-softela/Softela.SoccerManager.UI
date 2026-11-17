import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import type { RefObject } from 'react'

import type { RoutePath } from '@/constants/routes'

/** Who the sidebar lists an entry for: everyone who opens the club, or only its manager. */
export type SidebarItemAccess = 'everyone' | 'manager'

/** One entry of the sidebar as declared in `SIDEBAR_ITEMS`, before a club is known. */
export interface SidebarItemDefinition {
  /** The entry's name, shown beside its icon. */
  label: string

  /** The club route the entry leads to, still holding the `:leagueTeamId` placeholder. */
  route: RoutePath

  /** The entry's icon. */
  icon: IconDefinition

  /**
   * Who the entry is listed for. A `manager` entry also needs its route under `ManagedClubRoute`
   * in the router, so a visitor who types its address is sent away; that guard names this field
   * in turn.
   */
  access: SidebarItemAccess
}

/** One entry of the sidebar, resolved to the club in the address. */
export interface SidebarItem {
  /** The entry's name, shown beside its icon. */
  label: string

  /** The path of this entry for the club in the address. */
  to: string

  /** The entry's icon. */
  icon: IconDefinition
}

/** What `useSidebar` hands the view. */
export interface SidebarState {
  /** Whether the sidebar shows: on every page whose address names a club. */
  isVisible: boolean

  /**
   * The entries to link: those open to everyone, plus the manager's own when the user runs the
   * club. Empty while the user's clubs load, and the manager's entries stay out after they failed
   * to load.
   */
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
