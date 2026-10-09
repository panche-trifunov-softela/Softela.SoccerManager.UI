import { useId, useState } from 'react'

import type { LeagueSearchFormProps, LeagueSearchFormState } from './types'

/**
 * Holds what is typed into the search until it is submitted.
 *
 * @param onSearch Called with the typed value on each submit.
 * @returns The typed value, the hint's id, and the input and form handlers.
 */
export function useLeagueSearchForm(
  onSearch: LeagueSearchFormProps['onSearch'],
): LeagueSearchFormState {
  const [draft, setDraft] = useState('')
  const hintId = useId()

  const onDraftChange: LeagueSearchFormState['onDraftChange'] = (event) => {
    setDraft(event.target.value)
  }

  const onSubmit: LeagueSearchFormState['onSubmit'] = (event) => {
    event.preventDefault()
    onSearch(draft)
  }

  return { draft, hintId, onDraftChange, onSubmit }
}
