import { useEffect, useRef, useState } from 'react'

import { createLeagueTeamManagerApplication, toErrorMessage } from '@/services/api'
import { toast } from '@/store/toast'

import { APPLY_FAILED_MESSAGE, APPLY_SENT_MESSAGE } from './constants'

import type { AvailableTeamRow, AvailableTeamsTableProps, AvailableTeamsTableState } from './types'

/**
 * Applies for the table's clubs, one at a time.
 *
 * - A successful application says so, stays on the page and reloads the clubs. The pressed button
 *   keeps showing the club as being applied for until the reloaded clubs show it as applied.
 * - A failed one says why, naming the club, and the club can be applied for again.
 * - A click while an application is in flight, or once one has gone through, does nothing.
 * - While the reader has a pending application for a club with no manager, no other club can
 *   be applied for.
 * - An application that settles after the table has gone still says how it went.
 *
 * @param rows The clubs the table shows.
 * @param onApplied Reads the clubs again once an application went through.
 * @returns The club being applied for, whether a club can be applied for, and what applies.
 */
export function useAvailableTeamsTable(
  rows: AvailableTeamsTableProps['rows'],
  onApplied: AvailableTeamsTableProps['onApplied'],
): AvailableTeamsTableState {
  const [applyingId, setApplyingId] = useState<number | null>(null)

  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  // A pending application on a club that has since got a manager can never be accepted, so it
  // holds no other club back.
  const canApply = !rows.some((row) => row.hasPendingApplication && !row.isManaged)

  const apply = (row: AvailableTeamRow) => {
    if (applyingId !== null) return

    setApplyingId(row.id)

    // Two handlers rather than a trailing catch, so a throw while reloading can never be reported
    // as a failed application.
    const onSent = () => {
      toast.success(`${row.name}: ${APPLY_SENT_MESSAGE}`)

      // The id stays set: the pressed button keeps saying it is applying until the reloaded rows
      // show the club as applied, and no second application is made against stale rows.
      onApplied()
    }

    const onFailed = (cause: unknown) => {
      toast.error(`${row.name}: ${toErrorMessage(cause, APPLY_FAILED_MESSAGE)}`)

      if (isMounted.current) setApplyingId(null)
    }

    void createLeagueTeamManagerApplication({ leagueTeamId: row.id }).then(onSent, onFailed)
  }

  return { applyingId, canApply, apply }
}
