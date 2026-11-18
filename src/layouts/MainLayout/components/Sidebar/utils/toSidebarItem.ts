import { generatePath } from 'react-router'

import type { SidebarItem, SidebarItemDefinition } from '../types'

/**
 * Resolves a declared sidebar entry to one club: its route, and each link's route in a group,
 * become the club's paths.
 *
 * @param definition The entry as declared in `SIDEBAR_ITEMS`.
 * @param leagueTeamId The id of the club in the address.
 * @returns The entry with its paths for that club.
 */
export function toSidebarItem(
  definition: SidebarItemDefinition,
  leagueTeamId: number,
): SidebarItem {
  const params = { leagueTeamId: String(leagueTeamId) }

  if (definition.kind === 'group') {
    const { label, icon, links } = definition

    return {
      kind: 'group',
      label,
      icon,
      links: links.map((link) => ({ label: link.label, to: generatePath(link.route, params) })),
    }
  }

  const { label, icon, route } = definition

  return { kind: 'link', label, icon, to: generatePath(route, params) }
}
