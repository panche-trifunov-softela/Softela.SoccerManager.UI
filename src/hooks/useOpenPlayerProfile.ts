import { createElement } from 'react'

import { PlayerProfile } from '@/components/PlayerProfile'
import { SquadPlayerProfile } from '@/components/SquadPlayerProfile'
import { offCanvas } from '@/store/offCanvas'

import { useSelectedClub } from './useSelectedClub'

import type { PlayerProfileOpener } from '@/types/playerProfileOpener'
import type { PlayerProfileTarget } from '@/types/playerProfileTarget'

/**
 * Gives a page the call that opens a player's profile in the wide side panel.
 *
 * - With a club selected, the panel shows the player as that club's game world has them.
 * - With none, it shows the player's own record.
 * - The panel's title is the player's name.
 *
 * It is the one hook that imports the two panels from `@/components`, because it is the place that
 * picks between them.
 *
 * @returns `openPlayerProfile`, which opens the panel for the player it is handed.
 */
export function useOpenPlayerProfile(): PlayerProfileOpener {
  const { club } = useSelectedClub()

  const openPlayerProfile = ({ playerId, name }: PlayerProfileTarget) => {
    offCanvas.open({
      title: name,
      size: 'wide',
      content:
        club === null
          ? createElement(PlayerProfile, { playerId })
          : createElement(SquadPlayerProfile, { leagueTeamId: club.leagueTeamId, playerId }),
    })
  }

  return { openPlayerProfile }
}
