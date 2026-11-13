import { HistoryList } from '../HistoryList'

import { useTransfersPanel } from './useTransfersPanel'

import type { TransfersPanelProps } from './types'

/**
 * A player's accepted transfers and loans within the selected club's league, newest season first.
 * Each row shows the club the player joined, the season and the fee, with a note for a loan or a
 * swap; for a swap it also says who went where, the player sold against the players swapped in
 * exchange.
 *
 * @param props The selected club and the player whose transfers to show.
 * @returns The rendered list. While it loads, when it could not be read, or when it is empty, a
 * message shows in a live region instead.
 */
export function TransfersPanel({ leagueTeamId, playerId }: TransfersPanelProps) {
  const { items, message } = useTransfersPanel(leagueTeamId, playerId)

  return (
    <div>
      {items.length > 0 && <HistoryList items={items} />}

      <div role="status">{message !== null && <p className="label">{message}</p>}</div>
    </div>
  )
}
