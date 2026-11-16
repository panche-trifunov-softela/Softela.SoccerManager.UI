import { useEffect, useState } from 'react'

import { getLeagueTeamSquadMembers } from '@/services/api'
import { toast } from '@/store/toast'

import { SWAP_SQUAD_FAILED_MESSAGE } from './constants'

import type { LeagueTeamSquadMemberDto } from '@/types/leagueTeamSquadMemberDto'

import type { SwapSquadRead, SwapSquadState } from './types'

/**
 * Reads the squad of the bidding club once, for the players it can offer in swap.
 *
 * - Each finished read is kept with the club it was made for, and a read made for another club
 *   counts as still loading. State is written only when a read settles.
 * - A failure to read says so in a toast and leaves the squad empty. A read that was aborted says
 *   nothing.
 *
 * @param leagueTeamId The bidding club's league team id.
 * @returns Whether the squad is being read, was read, or could not be read, and its players in the
 * API's order.
 */
export function useSwapSquad(leagueTeamId: number): SwapSquadState {
  const [read, setRead] = useState<SwapSquadRead | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    const onRead = (members: LeagueTeamSquadMemberDto[]) => {
      setRead({ leagueTeamId, members })
    }

    const onFailed = () => {
      // An abort is this effect's own cleanup, not a failure to report.
      if (controller.signal.aborted) return

      toast.error(SWAP_SQUAD_FAILED_MESSAGE)

      setRead({ leagueTeamId, members: null })
    }

    // Two handlers rather than a trailing catch, so a throw while keeping the squad can never be
    // reported as a failed read.
    void getLeagueTeamSquadMembers(leagueTeamId, controller.signal).then(onRead, onFailed)

    return () => {
      controller.abort()
    }
  }, [leagueTeamId])

  const current = read !== null && read.leagueTeamId === leagueTeamId ? read : null

  if (current === null) return { status: 'loading', members: [] }

  if (current.members === null) return { status: 'failed', members: [] }

  return { status: 'ready', members: current.members }
}
