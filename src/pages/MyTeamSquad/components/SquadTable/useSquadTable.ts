import { toSquadMemberRow } from './utils'

import type { SquadTableProps, SquadTableState } from './types'

/**
 * Writes the squad as the table's rows, in the API's order, with ages counted to today.
 *
 * @param players The squad to show.
 * @returns The rows the table shows.
 */
export function useSquadTable(players: SquadTableProps['players']): SquadTableState {
  const today = new Date()

  return { rows: players.map((player) => toSquadMemberRow(player, today)) }
}
