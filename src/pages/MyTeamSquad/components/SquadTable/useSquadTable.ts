import { useOpenPlayerProfile } from '@/hooks/useOpenPlayerProfile'

import { toSquadMemberRow } from './utils'

import type { SquadMemberRow, SquadTableProps, SquadTableState } from './types'

/**
 * Writes the squad as the table's rows, in the API's order, with ages counted to today, and gives
 * the table the call that opens a player's profile.
 *
 * @param players The squad to show.
 * @returns The rows the table shows, and the call that opens a row's player in the profile panel.
 */
export function useSquadTable(players: SquadTableProps['players']): SquadTableState {
  const today = new Date()

  const { openPlayerProfile } = useOpenPlayerProfile()

  const showProfile = (row: SquadMemberRow) => {
    openPlayerProfile({ playerId: row.playerId, name: row.name })
  }

  return { rows: players.map((player) => toSquadMemberRow(player, today)), showProfile }
}
