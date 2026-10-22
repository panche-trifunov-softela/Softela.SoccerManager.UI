import { useEffect, useState } from 'react'

import { getNationalTeams, getPositions, getTeams, toErrorMessage } from '@/services/api'
import { toast } from '@/store/toast'

import { FILTERS_LOAD_FAILED_MESSAGE } from '../constants'

import type { FilterOptions } from '../types'

/**
 * Reads the positions, clubs and national teams the filters offer, once.
 *
 * State is written only when the read settles, so an unmounted page is never
 * written to. A failed read raises an error toast with the reason and leaves a
 * fixed line saying the filters could not be loaded; an aborted read raises
 * nothing.
 *
 * @returns The three lists, empty until the read settles, and the fixed line
 * that says the read failed, if it did.
 */
export function useFilterOptions(): FilterOptions {
  const [options, setOptions] = useState<FilterOptions>({
    positions: [],
    teams: [],
    nationalTeams: [],
    error: null,
  })

  useEffect(() => {
    const controller = new AbortController()

    Promise.all([
      getPositions(controller.signal),
      getTeams(controller.signal),
      getNationalTeams(controller.signal),
    ])
      .then(([positions, teams, nationalTeams]) => {
        setOptions({ positions, teams, nationalTeams, error: null })
      })
      .catch((cause: unknown) => {
        // An abort is this effect's own cleanup, not a failure to report.
        if (controller.signal.aborted) return

        toast.error(toErrorMessage(cause, FILTERS_LOAD_FAILED_MESSAGE))

        // The selects keep a fixed line rather than the raw cause, which can be a browser's
        // "Failed to fetch"; the toast carries the reason.
        setOptions({
          positions: [],
          teams: [],
          nationalTeams: [],
          error: FILTERS_LOAD_FAILED_MESSAGE,
        })
      })

    return () => {
      controller.abort()
    }
  }, [])

  return options
}
