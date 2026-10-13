import { useState } from 'react'

import type { SearchFormProps, SearchFormState } from './types'

/**
 * Holds what is typed into the search until it is submitted.
 *
 * @param onSearch Called with the typed value on each submit.
 * @returns The typed value, and the input and form handlers.
 */
export function useSearchForm(onSearch: SearchFormProps['onSearch']): SearchFormState {
  const [draft, setDraft] = useState('')

  const onDraftChange: SearchFormState['onDraftChange'] = (event) => {
    setDraft(event.target.value)
  }

  const onSubmit: SearchFormState['onSubmit'] = (event) => {
    event.preventDefault()
    onSearch(draft)
  }

  return { draft, onDraftChange, onSubmit }
}
