import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'

import { ROUTES } from '@/constants/routes'
import { createLeagueTeamManagerApplication, toErrorMessage } from '@/services/api'
import { toast } from '@/store/toast'

import { APPLY_FAILED_MESSAGE, APPLY_SENT_MESSAGE } from './constants'

import type { AvailableTeamRow, AvailableTeamsTableProps, AvailableTeamsTableState } from './types'

/**
 * Applies for the table's clubs, one at a time.
 *
 * - A successful application says so and goes Home.
 * - A failed one says why, naming the club, and the club can be applied for again.
 * - A click while an application is in flight does nothing.
 * - While the reader has a pending application for a club with no manager, no other club can
 *   be applied for.
 * - An application that settles after the table has gone still says how it went, but never moves
 *   the reader away from the page they went to.
 *
 * @param rows The clubs the table shows.
 * @returns The club being applied for, whether a club can be applied for, and what applies.
 */
export function useAvailableTeamsTable(
  rows: AvailableTeamsTableProps['rows'],
): AvailableTeamsTableState {
  const navigate = useNavigate()

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

    createLeagueTeamManagerApplication({ leagueTeamId: row.id })
      .then(() => {
        toast.success(`${row.name}: ${APPLY_SENT_MESSAGE}`)

        if (isMounted.current) void navigate(ROUTES.home)
      })
      .catch((cause: unknown) => {
        toast.error(`${row.name}: ${toErrorMessage(cause, APPLY_FAILED_MESSAGE)}`)

        if (isMounted.current) setApplyingId(null)
      })
  }

  return { applyingId, canApply, apply }
}
