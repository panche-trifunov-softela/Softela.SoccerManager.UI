import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'

import { ROUTES } from '@/constants/routes'
import { createLeagueTeamManagerApplication, toErrorMessage } from '@/services/api'

import { APPLY_FAILED_MESSAGE } from './constants'

import type { AvailableTeamRow, AvailableTeamsTableState } from './types'

/**
 * Applies for the table's clubs, one at a time.
 *
 * - A successful application goes Home.
 * - A failed one says why, and the club can be applied for again.
 * - A click while an application is in flight does nothing.
 * - An application that settles after the table has gone changes nothing, so it never moves the
 *   reader away from the page they went to.
 *
 * @returns The club being applied for, why the last application failed, and what applies.
 */
export function useAvailableTeamsTable(): AvailableTeamsTableState {
  const navigate = useNavigate()

  const [applyingId, setApplyingId] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  const apply = (row: AvailableTeamRow) => {
    if (applyingId !== null) return

    setApplyingId(row.id)
    setError(null)

    createLeagueTeamManagerApplication({ leagueTeamId: row.id })
      .then(() => {
        if (isMounted.current) void navigate(ROUTES.home)
      })
      .catch((cause: unknown) => {
        if (!isMounted.current) return

        setApplyingId(null)
        setError(toErrorMessage(cause, APPLY_FAILED_MESSAGE))
      })
  }

  return { applyingId, error, apply }
}
