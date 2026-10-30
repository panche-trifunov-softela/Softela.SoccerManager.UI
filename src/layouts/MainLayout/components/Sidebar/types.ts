import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

import type { RoutePath } from '@/constants/routes'

/** One entry of the sidebar as declared in `SIDEBAR_ITEMS`, before a club is known. */
export interface SidebarItemDefinition {
  /** The entry's name: its text from the lg breakpoint and its tooltip below it. */
  label: string

  /** The club route the entry leads to, still holding the `:leagueTeamId` placeholder. */
  route: RoutePath

  /** The entry's icon. */
  icon: IconDefinition
}

/** One entry of the sidebar, resolved to the selected club. */
export interface SidebarItem {
  /** The entry's name: its text from the lg breakpoint and its tooltip below it. */
  label: string

  /** The path of this entry for the selected club. */
  to: string

  /** The entry's icon. */
  icon: IconDefinition
}

/** What `useSidebar` hands the view. */
export interface SidebarState {
  /** Whether the sidebar takes its column: on a club page, or while the clubs are still loading. */
  isVisible: boolean

  /** The entries to link; empty until the URL's club is known to be one the user manages. */
  items: readonly SidebarItem[]
}
