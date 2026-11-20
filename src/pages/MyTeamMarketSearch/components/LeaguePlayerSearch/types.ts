import type { PlayerRow, PlayersTableProps } from '@/components/PlayersTable'
import type { PlayerSearchQueryState } from '@/types/playerSearchQueryState'

/** What `LeaguePlayerSearch` is handed. */
export interface LeaguePlayerSearchProps {
  /** The club whose League is searched. */
  leagueTeamId: number
}

/** One row of the League player table: a player, and whether he is registered at no club. */
export type LeaguePlayerRow = PlayerRow & {
  /** Whether the player is registered at no club of the League. */
  isFreeAgent: boolean
}

/** What `useLeaguePlayerSearch` exposes to the view. */
export interface LeaguePlayerSearchState
  extends Pick<PlayerSearchQueryState, 'query' | 'search' | 'filter'> {
  /** What the players table is handed, less the columns the view sets itself. */
  table: Omit<PlayersTableProps<LeaguePlayerRow>, 'actions' | 'lateColumns'>
}
