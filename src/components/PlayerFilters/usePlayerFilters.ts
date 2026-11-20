import { useFilterOptions } from './hooks'
import { toOptionalNumber } from './utils'

import type { PlayerFiltersProps, PlayerFiltersState } from './types'

/**
 * Reads the lists the filters offer and turns each select's choice into a
 * filter change.
 *
 * @param onFilter Called with the filter that changed.
 * @returns The lists, the line that says they could not be read, and one change
 * handler per select.
 */
export function usePlayerFilters(onFilter: PlayerFiltersProps['onFilter']): PlayerFiltersState {
  const options = useFilterOptions()

  const onPositionChange: PlayerFiltersState['onPositionChange'] = (event) => {
    onFilter({ positionId: toOptionalNumber(event.target.value) })
  }

  const onTeamChange: PlayerFiltersState['onTeamChange'] = (event) => {
    onFilter({ teamId: toOptionalNumber(event.target.value) })
  }

  const onNationalTeamChange: PlayerFiltersState['onNationalTeamChange'] = (event) => {
    onFilter({ nationalTeamId: toOptionalNumber(event.target.value) })
  }

  const onMinRatingChange: PlayerFiltersState['onMinRatingChange'] = (event) => {
    onFilter({ minRating: toOptionalNumber(event.target.value) })
  }

  return { ...options, onPositionChange, onTeamChange, onNationalTeamChange, onMinRatingChange }
}
