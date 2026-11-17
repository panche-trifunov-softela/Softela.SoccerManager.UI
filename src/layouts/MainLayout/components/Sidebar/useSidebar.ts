import { generatePath } from 'react-router'

import { useDrawer } from '@/hooks/useDrawer'
import { useSelectedClub } from '@/hooks/useSelectedClub'

import { SIDEBAR_ITEMS } from './constants'

import type { SidebarState } from './types'

/**
 * Decides whether the sidebar shows, picks the entries the user may see for the club in the
 * address, resolves them to it and wires its drawer to the shared drawer behaviour.
 *
 * - It shows on every page whose address names a club.
 * - An entry open to everyone is listed for any club. A manager's entry is listed only when the
 *   user runs the club, decided from their own clubs alone, so after those failed to load only
 *   the entries open to everyone remain.
 * - While the user's clubs load the column is kept with no entries, so the page does not jump
 *   once they arrive.
 *
 * @returns Whether the sidebar is visible, the entries to link, and the drawer's state, refs and
 * handlers.
 */
export function useSidebar(): SidebarState {
  const { leagueTeamId, club, isPending } = useSelectedClub()

  const isVisible = leagueTeamId !== null

  const items =
    leagueTeamId === null || isPending
      ? []
      : SIDEBAR_ITEMS.filter(({ access }) => access === 'everyone' || club !== null).map(
          ({ label, route, icon }) => ({
            label,
            icon,
            to: generatePath(route, { leagueTeamId: String(leagueTeamId) }),
          }),
        )

  const { isOpen, id, toggleRef, panelRef, toggle, close } = useDrawer({ isEnabled: items.length > 0 })

  return { isVisible, items, isOpen, navId: id, toggleRef, rootRef: panelRef, toggle, close }
}
