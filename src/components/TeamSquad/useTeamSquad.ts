import { useEffect, useState } from 'react'

import { getLeagueTeamSquad, toErrorMessage } from '@/services/api'
import { toast } from '@/store/toast'

import { SQUAD_LOAD_FAILED_MESSAGE } from './constants'
import { squadMessage, toSquadPlayerRow } from './utils'

import type { PlayerProfileTarget } from '@/types/playerProfileTarget'

import type { SquadPlayerRow, TeamSquadRead, TeamSquadState } from './types'

/**
 * Reads the squad of one league team.
 *
 * - Each finished read is kept with the league team it was made for, and a read made for another
 *   one counts as still loading. State is written only when a read settles.
 * - A failure to read says why in a toast, and the message under the table says the squad
 *   could not be loaded. A read that was aborted says nothing.
 * - The players keep the order the API returns them in.
 * - A row can be opened only when the caller handed over what opens a player.
 *
 * @param leagueTeamId The league team whose squad is read.
 * @param onOpenPlayer What opens a player's profile, or `undefined` when the names are plain text.
 * @returns The players to show, what shows under the table instead of players, if anything, and
 * what opens a row's player, if anything does.
 */
export function useTeamSquad(
  leagueTeamId: number,
  onOpenPlayer?: (target: PlayerProfileTarget) => void,
): TeamSquadState {
  const [read, setRead] = useState<TeamSquadRead | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    getLeagueTeamSquad(leagueTeamId, controller.signal)
      .then((players) => {
        setRead({ leagueTeamId, players, error: null })
      })
      .catch((cause: unknown) => {
        // An abort is this effect's own cleanup, not a failure to report.
        if (controller.signal.aborted) return

        toast.error(toErrorMessage(cause, SQUAD_LOAD_FAILED_MESSAGE))

        setRead({ leagueTeamId, players: [], error: SQUAD_LOAD_FAILED_MESSAGE })
      })

    return () => {
      controller.abort()
    }
  }, [leagueTeamId])

  const current = read !== null && read.leagueTeamId === leagueTeamId ? read : null

  const rows = (current?.players ?? []).map((player) => toSquadPlayerRow(player))

  const openPlayer =
    onOpenPlayer === undefined
      ? null
      : (row: SquadPlayerRow) => {
          onOpenPlayer({ playerId: row.id, name: row.name })
        }

  return {
    rows,
    message: squadMessage(current === null, current?.error ?? null, rows.length),
    openPlayer,
  }
}
