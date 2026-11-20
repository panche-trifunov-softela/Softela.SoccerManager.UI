import { useMemo } from 'react'

import { useOpenPlayerProfile } from '@/hooks/useOpenPlayerProfile'
import { usePlayerSearchQuery } from '@/hooks/usePlayerSearchQuery'
import { usePlayerSearchRead } from '@/hooks/usePlayerSearchRead'
import { searchPlayers } from '@/services/api'

import { usePlayerVotes } from './hooks'
import { toRatingsRow } from './utils'

import type { RatingsRow, RatingsState } from './types'

/**
 * Holds the search the Ratings page shows, reads its page of players, and works out the rows and
 * the vote buttons.
 *
 * - The search and the read behave as `usePlayerSearchQuery` and `usePlayerSearchRead` say.
 * - A row's name opens the player's profile.
 *
 * @returns The query and its handlers, what the players table is handed, and the vote buttons'
 * props for a row.
 */
export function useRatings(): RatingsState {
  const { query, search, filter, sort, goToPage } = usePlayerSearchQuery()

  const { result, isLoading, error } = usePlayerSearchRead(searchPlayers, query)

  const rows = useMemo(() => {
    const today = new Date()

    return (result?.items ?? []).map((item) => toRatingsRow(item, today))
  }, [result])

  const { voteButtonsFor } = usePlayerVotes()

  const { openPlayerProfile } = useOpenPlayerProfile()

  const onOpen = (row: RatingsRow) => {
    openPlayerProfile({ playerId: row.id, name: row.name })
  }

  return {
    query,
    search,
    filter,
    table: { query, rows, result, isLoading, error, onSort: sort, onPageChange: goToPage, onOpen },
    voteButtonsFor,
  }
}
