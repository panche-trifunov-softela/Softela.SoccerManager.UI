import { useSelectedClub } from '@/hooks/useSelectedClub'
import { toClubSubtitle } from '@/utils/toClubSubtitle'

import { useLineupEditor, useTacticsRead } from './hooks'
import { toTacticsView } from './utils'

import type { MyTeamTacticsState } from './types'

/**
 * Puts together what the tactics page shows for the club the address names.
 *
 * - The club comes from the shared selected-club hook. The subtitle names the club and its game
 *   world when the signed-in manager runs it, and is otherwise `null`.
 * - The data is read for any valid id in the address, a club the manager does not run included;
 *   the API decides who may see it. Only a manager who runs the club has an empty lineup picked
 *   for them on a first visit.
 * - While the data loads, when it could not be read, and when the club has no match to come or no
 *   formation to edit, a short fixed sentence shows in place of the board.
 *
 * @returns The subtitle, and either the sentence to show or the props of every part of the board.
 */
export function useMyTeamTactics(): MyTeamTacticsState {
  const { leagueTeamId, club } = useSelectedClub()

  const { read, isLoading, isReloading, reload, replaceLineup } = useTacticsRead(leagueTeamId)

  const editor = useLineupEditor({
    leagueTeamId,
    canAutoPickOnFirstVisit: club !== null,
    nextMatch: read?.nextMatch ?? null,
    isReloading,
    reload,
    replaceLineup,
  })

  return {
    subtitle: club === null ? null : toClubSubtitle(club),
    view: toTacticsView({ hasLeagueTeamId: leagueTeamId !== null, isLoading, read, editor }),
  }
}
