import type { HistoryItem } from '../HistoryList'

/** What `TransfersPanel` is handed. */
export interface TransfersPanelProps {
  /** The selected club: the league team whose league the transfers are read in. */
  leagueTeamId: number

  /** The player whose transfers are shown. */
  playerId: number
}

/** What `useTransfersPanel` exposes to the view. */
export interface TransfersPanelState {
  /** The rows to list, one per transfer, swap or loan, empty while there is nothing to list. */
  items: HistoryItem[]

  /** What shows instead of the list: that it is loading, why it could not be read, or that it is empty. */
  message: string | null
}
