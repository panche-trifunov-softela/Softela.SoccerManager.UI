import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import type { RefObject } from 'react'

import type { RoutePath } from '@/constants/routes'

/** Who the sidebar lists an entry for: everyone who opens the club, or only its manager. */
export type SidebarItemAccess = 'everyone' | 'manager'

/** A link inside a group, as declared in `SIDEBAR_ITEMS`, before a club is known. */
export interface SidebarSubLinkDefinition {
  /** The link's name. */
  label: string

  /** The club route the link leads to, still holding the `:leagueTeamId` placeholder. */
  route: RoutePath
}

/** An entry of the sidebar that is one link, as declared in `SIDEBAR_ITEMS`. */
export interface SidebarLinkDefinition {
  /** Tells a link from a group. */
  kind: 'link'

  /** The entry's name, shown beside its icon. */
  label: string

  /** The club route the entry leads to, still holding the `:leagueTeamId` placeholder. */
  route: RoutePath

  /** The entry's icon. */
  icon: IconDefinition

  /**
   * Who the entry is listed for. The route of a `manager` entry also belongs under
   * `ManagedClubRoute` in the router, so a visitor who types its address is sent away.
   */
  access: SidebarItemAccess
}

/** An entry of the sidebar that opens a list of links, as declared in `SIDEBAR_ITEMS`. */
export interface SidebarGroupDefinition {
  /** Tells a link from a group. */
  kind: 'group'

  /** The group's name, shown beside its icon. */
  label: string

  /** The group's icon. */
  icon: IconDefinition

  /**
   * Who the group is listed for. The routes of a `manager` group's links also belong under
   * `ManagedClubRoute` in the router.
   */
  access: SidebarItemAccess

  /** The links the group opens, in the order they show. */
  links: readonly SidebarSubLinkDefinition[]
}

/** One entry of the sidebar as declared in `SIDEBAR_ITEMS`, before a club is known. */
export type SidebarItemDefinition = SidebarLinkDefinition | SidebarGroupDefinition

/** A link inside a group, resolved to the club in the address. */
export interface SidebarSubLinkItem {
  /** The link's name. */
  label: string

  /** The path of this link for the club in the address. */
  to: string
}

/** An entry that is one link, resolved to the club in the address. */
export interface SidebarLinkItem {
  /** Tells a link from a group. */
  kind: 'link'

  /** The entry's name, shown beside its icon. */
  label: string

  /** The entry's icon. */
  icon: IconDefinition

  /** The path of this entry for the club in the address. */
  to: string
}

/** An entry that opens a list of links, resolved to the club in the address. */
export interface SidebarGroupItem {
  /** Tells a link from a group. */
  kind: 'group'

  /** The group's name, shown beside its icon. */
  label: string

  /** The group's icon. */
  icon: IconDefinition

  /** The group's links for the club in the address. */
  links: readonly SidebarSubLinkItem[]
}

/** One entry of the sidebar, resolved to the club in the address. */
export type SidebarItem = SidebarLinkItem | SidebarGroupItem

/** What `useSidebar` hands the view. */
export interface SidebarState {
  /** Whether the sidebar shows: on every page whose address names a club. */
  isVisible: boolean

  /**
   * The links and groups to list: those open to everyone, plus the manager's own when the user
   * runs the club. Empty while the user's clubs load, and the manager's entries stay out after
   * they failed to load.
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
