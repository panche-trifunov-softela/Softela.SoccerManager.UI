import { getLeaguePlayerTransfers } from '@/services/api'

import { usePlayerTabRead } from '../../hooks/usePlayerTabRead'

import { NO_TRANSFERS_MESSAGE, TRANSFERS_READ_MESSAGES } from './constants'
import { toTransferItem } from './utils'

import type { TransfersPanelState } from './types'

/**
 * Reads one player's transfers in a club's league and works out what the panel shows.
 *
 * @param leagueTeamId The selected club's league team id.
 * @param playerId The player whose transfers are read.
 * @returns The rows to list, newest first as the API returns them, or the sentence to show in
 * their place: that it is loading, why it failed, or that there are none.
 */
export function useTransfersPanel(leagueTeamId: number, playerId: number): TransfersPanelState {
  const { data, message } = usePlayerTabRead(
    leagueTeamId,
    playerId,
    getLeaguePlayerTransfers,
    TRANSFERS_READ_MESSAGES,
  )

  if (data === null) return { items: [], message }

  if (data.length === 0) return { items: [], message: NO_TRANSFERS_MESSAGE }

  return { items: data.map(toTransferItem), message: null }
}
