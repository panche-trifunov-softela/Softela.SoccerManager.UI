import { faUsers, faChalkboardUser } from '@fortawesome/free-solid-svg-icons'

import { ROUTES } from '@/constants/routes'

import type { SidebarItemDefinition } from './types'

/** What the sidebar's navigation landmark is called for screen readers. */
export const SIDEBAR_LABEL = 'Club'

/**
 * The sidebar's entries, in the order they show. A `manager` entry is listed only for a club the
 * user runs, and its route belongs under `ManagedClubRoute` in the router.
 */
export const SIDEBAR_ITEMS: readonly SidebarItemDefinition[] = [
  { label: 'Squad', route: ROUTES.myTeamSquad, icon: faUsers, access: 'everyone' },
  { label: 'Tactics', route: ROUTES.myTeamTactics, icon: faChalkboardUser, access: 'manager' },
]

/** The edge tab's name, open or closed; its `aria-expanded` carries the state. */
export const SIDEBAR_TOGGLE_LABEL = 'Club menu'
