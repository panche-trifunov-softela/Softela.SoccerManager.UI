import { useState } from 'react'

import { deleteMatchSubstitution } from '@/services/api'

import { SITUATION_DELETE_FAILED_MESSAGE, SITUATION_DELETE_REFRESH_MESSAGE } from '../constants'
import { isSameSituation, toSituationWindow } from '../utils'

import type { MatchSubstitutionDto } from '@/types/matchSubstitutionDto'

import type {
  MatchSituation,
  SituationEditorOptions,
  SituationEditorState,
  SituationKey,
} from '../types'

/**
 * Edits which of the club's substitutions for its next match is open, and deletes them. A
 * substitution is the lineup and the instructions the club switches to at one minute when the
 * score is in one situation.
 *
 * - One substitution is open at most, and it belongs to one match: it reads as closed for any
 *   other.
 * - While a substitution is saved, all of them share one minute, so the open one is always at that
 *   minute and the minute cannot be changed. Without one saved, any minute can be picked.
 * - Add situation opens the first situation with nothing saved at the window's minute, or the first
 *   situation at the first minute while none is saved. It does nothing when every situation is
 *   saved, or when the main lineup has a starter slot empty.
 * - Opening a substitution, with Add situation or Edit, reads the page's data again, since the
 *   markers compare with the main lineup, which may have changed. Switching to another minute or
 *   situation does not, and never moves a saved substitution.
 * - A delete is sent at once through the board's shared save (`useBoardSave`), with the saved list
 *   it returns swapped in. It closes the substitution when that was the open one.
 * - Every action is refused while the board is locked. Opening, switching and closing count in
 *   `epoch`, so a selection made before them reads as empty.
 *
 * @param options The match and its saved substitutions, what a substitution is picked by, the
 * board's shared save, and what to call to read the data again and to swap in the saved list.
 * @returns The open substitution, what the saved ones leave open, and the actions.
 */
export function useSituationEditor({
  nextMatch,
  situations,
  definitions,
  save,
  reload,
  replaceSituations,
}: SituationEditorOptions): SituationEditorState {
  const [opened, setOpened] = useState<MatchSituation | null>(null)

  const [epoch, setEpoch] = useState(0)

  const matchId = nextMatch?.matchId ?? null

  const situationWindow = toSituationWindow(situations, definitions, nextMatch?.lineup ?? null)

  const stored = opened !== null && opened.matchId === matchId ? opened.key : null

  // While a substitution is saved the open one is always at the window's minute, so a reload that
  // shows another device's window cannot leave it outside.
  const open: SituationKey | null =
    stored === null
      ? null
      : { minuteAt: situationWindow.minuteAt ?? stored.minuteAt, situation: stored.situation }

  const show = (key: SituationKey, rereads: boolean) => {
    if (matchId === null) return

    setOpened({ matchId, key })

    setEpoch((count) => count + 1)

    if (rereads) reload()
  }

  const add = () => {
    const { canAdd, nextFree } = situationWindow

    if (save.isLocked || !canAdd || nextFree === null) return

    show(nextFree, true)
  }

  const edit = (key: SituationKey) => {
    if (save.isLocked || (open !== null && isSameSituation(open, key))) return

    // The key is built from its two numbers, since the argument may be a richer object.
    show({ minuteAt: key.minuteAt, situation: key.situation }, true)
  }

  const close = () => {
    if (save.isLocked || open === null) return

    setOpened(null)

    setEpoch((count) => count + 1)
  }

  const changeMinute = (minuteAt: number) => {
    if (save.isLocked || open === null) return

    if (situationWindow.minuteAt !== null || minuteAt === open.minuteAt) return

    show({ minuteAt, situation: open.situation }, false)
  }

  const changeSituation = (situation: number) => {
    if (save.isLocked || open === null || situation === open.situation) return

    show({ minuteAt: open.minuteAt, situation }, false)
  }

  const remove = (key: SituationKey) => {
    if (save.isLocked || nextMatch === null) return

    const { matchId: deletedMatchId, leagueTeamId } = nextMatch.lineup

    // The board is locked until the answer, so the open substitution cannot change before it.
    const wasOpen = open !== null && isSameSituation(open, key)

    const onDone = (list: MatchSubstitutionDto[]) => {
      replaceSituations(deletedMatchId, leagueTeamId, list)

      if (!wasOpen) return

      setOpened(null)

      setEpoch((count) => count + 1)
    }

    save.send(
      () =>
        deleteMatchSubstitution({
          matchId: deletedMatchId,
          leagueTeamId,
          minuteAt: key.minuteAt,
          situation: key.situation,
        }),
      onDone,
      {
        failedMessage: SITUATION_DELETE_FAILED_MESSAGE,
        refreshMessage: SITUATION_DELETE_REFRESH_MESSAGE,
      },
    )
  }

  return {
    open,
    epoch,
    window: situationWindow,
    add,
    edit,
    close,
    changeMinute,
    changeSituation,
    remove,
  }
}
