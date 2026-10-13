import { useEffect, useState } from 'react'

import { getNationalTeams, getPositions, getTeams } from '@/services/api'

import type { FilterOptions } from '../types'

/**
 * Reads the positions, clubs and national teams the filters offer, once.
 *
 * State is written only when the read settles, so an unmounted page is never
 * written to.
 *
 * @returns The three lists, empty until the read settles, and why the read
 * failed, if it did.
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

        setOptions({
          positions: [],
          teams: [],
          nationalTeams: [],
          error: cause instanceof Error ? cause.message : 'Filters could not be loaded.',
        })
      })

    return () => {
      controller.abort()
    }
  }, [])

  return options
}
