import { createElement } from 'react'

import { TeamSquad } from '@/components/TeamSquad'
import { SQUAD_TITLE } from '@/constants/squadTitle'
import { offCanvas } from '@/store/offCanvas'

import type { TeamSquadOpener } from '@/types/teamSquadOpener'
import type { TeamSquadTarget } from '@/types/teamSquadTarget'

/**
 * Gives a page the call that opens a club's squad in the side panel.
 *
 * - The panel's title is "Squad".
 * - The squad's player names are buttons only when the target carries `onOpenPlayer`.
 *
 * @returns `openTeamSquad`, which opens the panel for the club it is handed.
 */
export function useOpenTeamSquad(): TeamSquadOpener {
  const openTeamSquad = (target: TeamSquadTarget) => {
    offCanvas.open({
      title: SQUAD_TITLE,
      content: createElement(TeamSquad, target),
    })
  }

  return { openTeamSquad }
}
