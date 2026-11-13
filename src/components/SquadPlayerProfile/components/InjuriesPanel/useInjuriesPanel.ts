import { getLeaguePlayerInjuries } from '@/services/api'

import { usePlayerTabRead } from '../../hooks/usePlayerTabRead'

import { INJURIES_READ_MESSAGES, NO_INJURIES_MESSAGE } from './constants'
import { toInjuryItem } from './utils'

import type { InjuriesPanelState } from './types'

/**
 * Reads one player's injuries in a club's league and works out what the panel shows.
 *
 * @param leagueTeamId The selected club's league team id.
 * @param playerId The player whose injuries are read.
 * @returns The rows to list, newest first as the API returns them, or the sentence to show in
 * their place: that it is loading, why it failed, or that there are none.
 */
export function useInjuriesPanel(leagueTeamId: number, playerId: number): InjuriesPanelState {
  const { data, message } = usePlayerTabRead(
    leagueTeamId,
    playerId,
    getLeaguePlayerInjuries,
    INJURIES_READ_MESSAGES,
  )

  if (data === null) return { items: [], message }

  if (data.length === 0) return { items: [], message: NO_INJURIES_MESSAGE }

  return { items: data.map(toInjuryItem), message: null }
}
