import type { HistoryItem } from '../HistoryList'

/** What `InjuriesPanel` is handed. */
export interface InjuriesPanelProps {
  /** The selected club: the league team whose league the injuries are read in. */
  leagueTeamId: number

  /** The player whose injuries are shown. */
  playerId: number
}

/** What `useInjuriesPanel` exposes to the view. */
export interface InjuriesPanelState {
  /** The rows to list, one per injury, empty while there is nothing to list. */
  items: HistoryItem[]

  /** What shows instead of the list: that it is loading, why it could not be read, or that it is empty. */
  message: string | null
}
