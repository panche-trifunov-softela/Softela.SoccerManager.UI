import { useEffect, useMemo, useState } from 'react'

import { useActingClub } from '@/hooks/useActingClub'
import { useSelectedClub } from '@/hooks/useSelectedClub'
import { getLeagueTeamSchedule, toErrorMessage } from '@/services/api'
import { toast } from '@/store/toast'
import { toClubSubtitle } from '@/utils/toClubSubtitle'

import { SCHEDULE_LOAD_FAILED_MESSAGE } from './constants'
import { myTeamScheduleMessage, toScheduleRow } from './utils'

import type { MyTeamScheduleRead, MyTeamScheduleState } from './types'

/**
 * Reads the schedule of the club the address names: every match of the club in its League's
 * latest season, as any signed-in user sees it.
 *
 * - Each finished read is kept with the club it was made for, and a read made for another club
 *   counts as still loading. State is written only when a read settles.
 * - An address that names no valid id reads nothing. It shows that the club could not be found.
 * - Any failure to read says why in a toast and shows a fixed sentence where the table would be.
 *   A read that was aborted says nothing.
 * - The club comes from the shared selected-club hook, and the club the user only visits from
 *   the shared acting-club hook. The subtitle names the club and its League, from the user's own
 *   club or the visited club's profile, and is `null` until either is known. The schedule is read
 *   for any valid id in the address.
 *
 * @returns The subtitle, the rows in the API's order, and what shows instead of the table.
 */
export function useMyTeamSchedule(): MyTeamScheduleState {
  const { leagueTeamId, club } = useSelectedClub()
  const { visitedClub } = useActingClub()

  const namedClub = club ?? visitedClub

  const [read, setRead] = useState<MyTeamScheduleRead | null>(null)

  useEffect(() => {
    if (leagueTeamId === null) return

    const controller = new AbortController()

    getLeagueTeamSchedule(leagueTeamId, controller.signal)
      .then((matches) => {
        setRead({ leagueTeamId, matches, error: null })
      })
      .catch((cause: unknown) => {
        // An abort is this effect's own cleanup, not a failure to report.
        if (controller.signal.aborted) return

        toast.error(toErrorMessage(cause, SCHEDULE_LOAD_FAILED_MESSAGE))

        setRead({ leagueTeamId, matches: [], error: SCHEDULE_LOAD_FAILED_MESSAGE })
      })

    return () => {
      controller.abort()
    }
  }, [leagueTeamId])

  const current = read !== null && read.leagueTeamId === leagueTeamId ? read : null

  const rows = useMemo(() => (current?.matches ?? []).map(toScheduleRow), [current])

  return {
    subtitle: namedClub === null ? null : toClubSubtitle(namedClub),
    rows,
    message: myTeamScheduleMessage(
      leagueTeamId !== null,
      current === null,
      current?.error ?? null,
      rows.length,
    ),
  }
}
