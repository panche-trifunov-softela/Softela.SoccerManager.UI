import { useId } from 'react'

import type { LeagueSearchFormState } from './types'

/**
 * Makes the id that ties the hint to the search input it describes.
 *
 * @returns The hint's id.
 */
export function useLeagueSearchForm(): LeagueSearchFormState {
  const hintId = useId()

  return { hintId }
}
