import { useEffect, useState } from 'react'

import { CLUB_NOT_MANAGED_MESSAGE } from '@/constants/clubNotManaged'
import {
  ApiError,
  getLeagueTeamLoanBids,
  getLeagueTeamTransferBids,
  toErrorMessage,
} from '@/services/api'
import { toast } from '@/store/toast'

import { CLUB_BIDS_TEXTS } from '../constants'
import { toLoanBidRows, toTransferBidRows } from '../utils'

import type { BidKind } from '@/types/bidKind'

import type { ClubBidsReadState, ClubBidsSettledRead } from '../types'

/**
 * Reads a club's bids of one kind and works out what the page shows.
 *
 * - Each finished read is kept with the club and the kind it was made for, and a read made for
 *   another pair counts as still loading. State is written only when a read settles.
 * - A caller who does not manage the club (a 403) gets a fixed sentence and no toast.
 * - Any other failure says why in a toast, and the page says the bids could not be loaded. A read
 *   that was aborted says nothing.
 * - `reload` reads the bids again. What was read stays on screen until the new read settles, and a
 *   read still under way is aborted.
 * - With no club, nothing is read and nothing is said.
 *
 * @param leagueTeamId The club whose bids are read, or `null` when the address names none.
 * @param kind Which kind of bid to read.
 * @returns What was read, or the sentence to show in its place, and the function that reads it
 * again.
 */
export function useClubBidsRead(leagueTeamId: number | null, kind: BidKind): ClubBidsReadState {
  const [settled, setSettled] = useState<ClubBidsSettledRead | null>(null)

  const [reloads, setReloads] = useState(0)

  const texts = CLUB_BIDS_TEXTS[kind]

  useEffect(() => {
    if (leagueTeamId === null) return undefined

    const controller = new AbortController()

    const reading =
      kind === 'transfer'
        ? getLeagueTeamTransferBids(leagueTeamId, controller.signal).then(toTransferBidRows)
        : getLeagueTeamLoanBids(leagueTeamId, controller.signal).then(toLoanBidRows)

    reading
      .then((rows) => {
        setSettled({ leagueTeamId, kind, rows, message: null })
      })
      .catch((cause: unknown) => {
        // An abort is this effect's own cleanup, not a failure to report.
        if (controller.signal.aborted) return

        if (cause instanceof ApiError && cause.status === 403) {
          setSettled({ leagueTeamId, kind, rows: null, message: CLUB_NOT_MANAGED_MESSAGE })

          return
        }

        toast.error(toErrorMessage(cause, texts.failed))

        setSettled({ leagueTeamId, kind, rows: null, message: texts.failed })
      })

    return () => {
      controller.abort()
    }
  }, [leagueTeamId, kind, texts, reloads])

  const reload = () => {
    setReloads((count) => count + 1)
  }

  if (leagueTeamId === null) return { rows: null, message: null, reload }

  const current =
    settled !== null && settled.leagueTeamId === leagueTeamId && settled.kind === kind
      ? settled
      : null

  if (current === null) return { rows: null, message: texts.loading, reload }

  return { rows: current.rows, message: current.message, reload }
}
