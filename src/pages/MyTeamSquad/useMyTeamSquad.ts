import { useEffect, useState } from 'react'

import { useSelectedClub } from '@/hooks/useSelectedClub'
import { getLeagueTeamSquadMembers, toErrorMessage } from '@/services/api'
import { toast } from '@/store/toast'
import { toClubSubtitle } from '@/utils/toClubSubtitle'

import { SQUAD_LOAD_FAILED_MESSAGE } from './constants'
import { myTeamSquadMessage } from './utils'

import type { MyTeamSquadRead, MyTeamSquadState } from './types'

/**
 * Reads the squad of the club the address names, as its manager sees it.
 *
 * - Each finished read is kept with the club it was made for, and a read made for another club
 *   counts as still loading. State is written only when a read settles.
 * - An address that names no valid id reads nothing. It shows that the club could not be found.
 * - Any failure to read, a refusal for a caller who does not manage the club included, says why
 *   in a toast and shows a fixed sentence where the table would be. A read that was aborted says
 *   nothing.
 * - The club comes from the shared selected-club hook. The subtitle names the club and its game
 *   world when the signed-in manager runs it, and is otherwise `null`. The squad is read for any
 *   valid id in the address, a club the manager does not run included.
 *
 * @returns The subtitle, the players in the API's order, and what shows instead of the table.
 */
export function useMyTeamSquad(): MyTeamSquadState {
  const { leagueTeamId, club } = useSelectedClub()

  const [read, setRead] = useState<MyTeamSquadRead | null>(null)

  useEffect(() => {
    if (leagueTeamId === null) return

    const controller = new AbortController()

    getLeagueTeamSquadMembers(leagueTeamId, controller.signal)
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

  const players = current?.players ?? []

  return {
    subtitle: club === null ? null : toClubSubtitle(club),
    players,
    message: myTeamSquadMessage(
      leagueTeamId !== null,
      current === null,
      current?.error ?? null,
      players.length,
    ),
  }
}
