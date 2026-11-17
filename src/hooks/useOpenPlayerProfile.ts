import { createElement } from 'react'

import { PlayerProfile } from '@/components/PlayerProfile'
import { SquadPlayerProfile } from '@/components/SquadPlayerProfile'
import { offCanvas } from '@/store/offCanvas'

import { useActingClub } from './useActingClub'

import type { ReactElement } from 'react'
import type { PlayerProfileOpener } from '@/types/playerProfileOpener'
import type { PlayerProfileTarget } from '@/types/playerProfileTarget'

/**
 * Gives a page the call that opens a player's profile in the wide side panel.
 *
 * - With an acting club, the panel shows the player as that club's league has them. On another
 *   club's page that is the manager's own club in the same league.
 * - With none, it shows the player's own record.
 * - A free agent has no registration in the league, so even with an acting club the panel shows the
 *   player's own record, with "Free agent" where the club would be.
 * - The panel's title is the player's name.
 *
 * It is the one hook that imports the two panels from `@/components`, because it is the place that
 * picks between them.
 *
 * @returns `openPlayerProfile`, which opens the panel for the player it is handed.
 */
export function useOpenPlayerProfile(): PlayerProfileOpener {
  const { actingClubId } = useActingClub()

  const openPlayerProfile = ({ playerId, name, isFreeAgent = false }: PlayerProfileTarget) => {
    let content: ReactElement

    if (isFreeAgent) {
      content = createElement(PlayerProfile, { playerId, isFreeAgent })
    } else if (actingClubId === null) {
      content = createElement(PlayerProfile, { playerId })
    } else {
      content = createElement(SquadPlayerProfile, { leagueTeamId: actingClubId, playerId })
    }

    offCanvas.open({ title: name, size: 'wide', content })
  }

  return { openPlayerProfile }
}
