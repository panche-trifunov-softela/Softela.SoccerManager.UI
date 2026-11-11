import { faUsers, faChalkboardUser } from '@fortawesome/free-solid-svg-icons'

import { ROUTES } from '@/constants/routes'

import type { SidebarItemDefinition } from './types'

/** What the sidebar's navigation landmark is called for screen readers. */
export const SIDEBAR_LABEL = 'Club'

/** The sidebar's entries, in the order they show. */
export const SIDEBAR_ITEMS: readonly SidebarItemDefinition[] = [
  { label: 'Squad', route: ROUTES.myTeamSquad, icon: faUsers },
  { label: 'Tactics', route: ROUTES.myTeamTactics, icon: faChalkboardUser },
]

/** The phone toggle's name while the sidebar is open. */
export const SIDEBAR_COLLAPSE_LABEL = 'Hide club menu'

/** The phone toggle's name while the sidebar is collapsed. */
export const SIDEBAR_EXPAND_LABEL = 'Show club menu'

/** The localStorage key that remembers, on this device, whether the sidebar is collapsed. */
export const SIDEBAR_COLLAPSED_STORAGE_KEY = 'the11master.sidebarCollapsed'
