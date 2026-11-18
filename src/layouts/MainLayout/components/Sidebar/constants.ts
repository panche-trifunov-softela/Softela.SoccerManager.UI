import { faUsers, faChalkboardUser, faStore } from '@fortawesome/free-solid-svg-icons'

import { ROUTES } from '@/constants/routes'

import type { SidebarItemDefinition } from './types'

/** What the sidebar's navigation landmark is called for screen readers. */
export const SIDEBAR_LABEL = 'Club'

/**
 * The sidebar's entries, in the order they show: a link, or a group that opens a list of links. A
 * `manager` entry is listed only for a club the user runs, and its route, or the routes of its
 * links, belong under `ManagedClubRoute` in the router.
 */
export const SIDEBAR_ITEMS: readonly SidebarItemDefinition[] = [
  { kind: 'link', label: 'Squad', route: ROUTES.myTeamSquad, icon: faUsers, access: 'everyone' },
  {
    kind: 'link',
    label: 'Tactics',
    route: ROUTES.myTeamTactics,
    icon: faChalkboardUser,
    access: 'manager',
  },
  {
    kind: 'group',
    label: 'Market',
    icon: faStore,
    access: 'manager',
    links: [
      { label: 'Transfer bids', route: ROUTES.myTeamMarketTransferBids },
      { label: 'Loan bids', route: ROUTES.myTeamMarketLoanBids },
      { label: 'Shortlisted players', route: ROUTES.myTeamMarketShortlist },
      { label: 'Search players', route: ROUTES.myTeamMarketSearch },
    ],
  },
]

/** The edge tab's name, open or closed; its `aria-expanded` carries the state. */
export const SIDEBAR_TOGGLE_LABEL = 'Club menu'
