import { HistoryList } from '../HistoryList'

import { useInjuriesPanel } from './useInjuriesPanel'

import type { InjuriesPanelProps } from './types'

/**
 * A player's injuries recorded in the selected club's league, newest first. Each row shows the
 * injury's name, its start and end dates under it and its scale (Minor, Moderate or Serious) at the
 * right edge, with no crest.
 *
 * @param props The selected club and the player whose injuries to show.
 * @returns The rendered list. While it loads, when it could not be read, or when it is empty, a
 * message shows in a live region instead.
 */
export function InjuriesPanel({ leagueTeamId, playerId }: InjuriesPanelProps) {
  const { items, message } = useInjuriesPanel(leagueTeamId, playerId)

  return (
    <div>
      {items.length > 0 && <HistoryList items={items} />}

      <div role="status">{message !== null && <p className="label">{message}</p>}</div>
    </div>
  )
}
