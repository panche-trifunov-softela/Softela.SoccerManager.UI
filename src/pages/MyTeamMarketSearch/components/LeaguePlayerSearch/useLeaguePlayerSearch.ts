import { useCallback, useMemo } from 'react'

import { CLUB_NOT_MANAGED_MESSAGE } from '@/constants/clubNotManaged'
import { useOpenPlayerProfile } from '@/hooks/useOpenPlayerProfile'
import { usePlayerSearchQuery } from '@/hooks/usePlayerSearchQuery'
import { usePlayerSearchRead } from '@/hooks/usePlayerSearchRead'
import { searchPlayersInLeague } from '@/services/api'

import { toLeaguePlayerRow } from './utils'

import type { PlayerSearchQuery } from '@/types/playerSearchQuery'

import type { LeaguePlayerRow, LeaguePlayerSearchState } from './types'

/**
 * Holds the search the page shows, reads its page of the League's players, and works out the rows.
 *
 * - The search and the read behave as `usePlayerSearchQuery` and `usePlayerSearchRead` say; a 403
 *   keeps the sentence saying the user no longer manages the club, with no toast.
 * - A row's name opens the player's profile; a free agent's opens at once with no club.
 *
 * @param leagueTeamId The club whose League is searched.
 * @returns The query and its handlers, and what the players table is handed.
 */
export function useLeaguePlayerSearch(leagueTeamId: number): LeaguePlayerSearchState {
  const { query, search, filter, sort, goToPage } = usePlayerSearchQuery()

  const readPage = useCallback(
    (pageQuery: PlayerSearchQuery, signal: AbortSignal) =>
      searchPlayersInLeague(leagueTeamId, pageQuery, signal),
    [leagueTeamId],
  )

  const { result, isLoading, error } = usePlayerSearchRead(
    readPage,
    query,
    CLUB_NOT_MANAGED_MESSAGE,
  )

  const rows = useMemo(() => {
    const today = new Date()

    return (result?.items ?? []).map((item) => toLeaguePlayerRow(item, today))
  }, [result])

  const { openPlayerProfile } = useOpenPlayerProfile()

  const onOpen = (row: LeaguePlayerRow) => {
    openPlayerProfile({ playerId: row.id, name: row.name, isFreeAgent: row.isFreeAgent })
  }

  return {
    query,
    search,
    filter,
    table: { query, rows, result, isLoading, error, onSort: sort, onPageChange: goToPage, onOpen },
  }
}
