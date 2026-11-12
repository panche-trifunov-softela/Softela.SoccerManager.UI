import { useOpenPlayerProfile } from '@/hooks/useOpenPlayerProfile'
import { useSelectedClub } from '@/hooks/useSelectedClub'
import { toClubSubtitle } from '@/utils/toClubSubtitle'

import {
  useBoardSave,
  useInstructionsEditor,
  useLineupEditor,
  useSituationEditor,
  useTacticsRead,
} from './hooks'
import { toSituationMatch, toTacticsView } from './utils'

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
 *   either locks the whole board.
 * - The squad list's info buttons open a player's profile in the side panel.
 * - A situation, once open, is what the board shows and what every change goes to: its saved
 *   lineup and instructions, or the main ones while nothing is saved for it.
 * - While the data loads, when it could not be read, and when the club has no match to come or no
 *   formation to edit, a short fixed sentence shows in place of the board.
 *
 * @returns The subtitle, and either the sentence to show or the props of every part of the board.
 */
export function useMyTeamTactics(): MyTeamTacticsState {
  const { leagueTeamId, club } = useSelectedClub()

  const { openPlayerProfile } = useOpenPlayerProfile()

  const {
    read,
    isLoading,
    isReloading,
    reload,
    replaceLineup,
    replaceInstructions,
    replaceSituations,
  } = useTacticsRead(leagueTeamId)

  const nextMatch = read?.nextMatch ?? null

  const situations = read?.situations ?? []

  const save = useBoardSave({ matchId: nextMatch?.matchId ?? null, isReloading, reload })

  const situation = useSituationEditor({
    nextMatch,
    situations,
    definitions: read?.substitutionDefinitions ?? [],
    save,
    reload,
    replaceSituations,
  })

  // The board and both editors work on the open situation's saved lineup and instructions, or on
  // the main ones.
  const shownMatch = toSituationMatch(nextMatch, situations, situation.open)

  const editor = useLineupEditor({
    leagueTeamId,
    canAutoPickOnFirstVisit: club !== null,
    nextMatch: shownMatch,
    save,
    replaceLineup,
    situation: situation.open,
    selectionEpoch: situation.epoch,
    replaceSituations,
  })

  const instructionsEditor = useInstructionsEditor({
    nextMatch: shownMatch,
    save,
    replaceInstructions,
    situation: situation.open,
    replaceSituations,
  })

  return {
    subtitle: club === null ? null : toClubSubtitle(club),
    view: toTacticsView({
      hasLeagueTeamId: leagueTeamId !== null,
      isLoading,
      read,
      shownMatch,
      editors: {
        save,
        lineup: editor,
        instructions: instructionsEditor,
        situation,
        openPlayerProfile,
      },
    }),
  }
}
