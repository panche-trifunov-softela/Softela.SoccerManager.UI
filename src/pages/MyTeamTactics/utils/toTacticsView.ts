import {
  CLUB_NOT_FOUND_MESSAGE,
  NO_FORMATION_MESSAGE,
  NO_NEXT_MATCH_MESSAGE,
  TACTICS_LOADING_MESSAGE,
} from '../constants'

import { toTacticsBoard } from './toTacticsBoard'

import type { TacticsView, TacticsViewInput } from '../types'

/**
 * Says what the page shows under its title: a fixed sentence, or the board.
 *
 * The checks run in this order, and the first that holds decides:
 *
 * 1. The address names no valid club id: the club could not be found.
 * 2. The read is still in flight, or there is none yet: the tactics are loading.
 * 3. The read failed: the sentence that says so.
 * 4. The club has no match to come: that there is none.
 * 5. The match's lineup has no formation or no slots: that no formation is available.
 *
 * Every check runs on the main match, so an empty substitution lineup never hides the toolbar that
 * closes it. When none holds, the board is built from the match as shown, the read and the
 * editors.
 *
 * @param input Whether the address names a club, the state of the read, the match as shown, and the
 * editors.
 * @returns The sentence to show, or the props of every part of the board.
 */
export function toTacticsView({
  hasLeagueTeamId,
  isLoading,
  read,
  shownMatch,
  editors,
}: TacticsViewInput): TacticsView {
  if (!hasLeagueTeamId) return { kind: 'message', message: CLUB_NOT_FOUND_MESSAGE }

  if (isLoading || read === null) return { kind: 'message', message: TACTICS_LOADING_MESSAGE }

  if (read.error !== null) return { kind: 'message', message: read.error }

  const { nextMatch } = read

  if (nextMatch === null) return { kind: 'message', message: NO_NEXT_MATCH_MESSAGE }

  const { lineup } = nextMatch

  if (lineup.formationId === null || lineup.slots.length === 0) {
    return { kind: 'message', message: NO_FORMATION_MESSAGE }
  }

  return { kind: 'board', board: toTacticsBoard(shownMatch ?? nextMatch, read, editors) }
}
