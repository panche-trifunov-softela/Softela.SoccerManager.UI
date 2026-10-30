import { faChessBoard, faUsers } from '@fortawesome/free-solid-svg-icons'

import { ROUTES } from '@/constants/routes'

import type { SidebarItemDefinition } from './types'

/** What the sidebar's navigation landmark is called for screen readers. */
export const SIDEBAR_LABEL = 'Club'

/** The sidebar's entries, in the order they show. */
export const SIDEBAR_ITEMS: readonly SidebarItemDefinition[] = [
  { label: 'Squad', route: ROUTES.myTeamSquad, icon: faUsers },
  { label: 'Tactics', route: ROUTES.myTeamTactics, icon: faChessBoard },
]
