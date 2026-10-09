import { useState } from 'react'

import type { AddTeamState } from './types'

/**
 * Holds the search the page lists leagues by. A submitted value is trimmed,
 * and a blank one clears the search.
 *
 * @returns The current search and the function that submits a new one.
 */
export function useAddTeam(): AddTeamState {
  const [searchTerm, setSearchTerm] = useState<string | null>(null)

  const search = (value: string) => {
    const trimmed = value.trim()

    setSearchTerm(trimmed === '' ? null : trimmed)
  }

  return { searchTerm, search }
}
