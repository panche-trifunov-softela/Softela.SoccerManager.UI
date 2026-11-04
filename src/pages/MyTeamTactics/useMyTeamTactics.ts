import { useSelectedClub } from '@/hooks/useSelectedClub'
import { toClubSubtitle } from '@/utils/toClubSubtitle'

import { useBoardSave, useInstructionsEditor, useLineupEditor, useTacticsRead } from './hooks'
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
 * - The lineup and the team instructions are edited through one shared save, so a request for
 *   either locks the whole board and shares one save status.
 * - While the data loads, when it could not be read, and when the club has no match to come or no
 *   formation to edit, a short fixed sentence shows in place of the board.
 *
 * @returns The subtitle, and either the sentence to show or the props of every part of the board.
 */
export function useMyTeamTactics(): MyTeamTacticsState {
  const { leagueTeamId, club } = useSelectedClub()

  const { read, isLoading, isReloading, reload, replaceLineup, replaceInstructions } =
    useTacticsRead(leagueTeamId)

  const nextMatch = read?.nextMatch ?? null

  const save = useBoardSave({ matchId: nextMatch?.matchId ?? null, isReloading, reload })

  const editor = useLineupEditor({
    leagueTeamId,
    canAutoPickOnFirstVisit: club !== null,
    nextMatch,
    save,
    replaceLineup,
  })

  const instructionsEditor = useInstructionsEditor({ nextMatch, save, replaceInstructions })

  return {
    subtitle: club === null ? null : toClubSubtitle(club),
    view: toTacticsView({
      hasLeagueTeamId: leagueTeamId !== null,
      isLoading,
      read,
      editors: { save, lineup: editor, instructions: instructionsEditor },
    }),
  }
}
