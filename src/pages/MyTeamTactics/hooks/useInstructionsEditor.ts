import { saveMatchInstructions } from '@/services/api'

import { INSTRUCTIONS_REFRESH_MESSAGE, INSTRUCTIONS_SAVE_FAILED_MESSAGE } from '../constants'

import type { InstructionField } from '@/types/instructionField'
import type { SaveMatchInstructionsRequest } from '@/types/saveMatchInstructionsRequest'

import type { InstructionsEditorOptions, InstructionsEditorState } from '../types'

/**
 * Edits the team instructions of the club's next match, one request per change.
 *
 * - While the board is locked, a change is refused: a second request is never sent. Nothing on
 *   screen changes until the response arrives. The response replaces the shown instructions.
 * - Only the instruction that changed is sent, so a change made on another device to a different
 *   one is kept. Choosing the value already shown sends nothing.
 * - The requests go through the board's shared save (`useBoardSave`), which sends one at a time,
 *   locks every control while one is outstanding or the page's data is read again, reports where
 *   the save stands, and reads the data again after a 400, 403, 404 or 500.
 *
 * @param options The match whose instructions are edited, the board's shared save, and what to
 * call to swap in instructions the API returned.
 * @returns The action that changes one instruction.
 */
export function useInstructionsEditor({
  nextMatch,
  save,
  replaceInstructions,
}: InstructionsEditorOptions): InstructionsEditorState {
  const instructions = nextMatch?.instructions ?? null

  const change = (field: InstructionField, value: number) => {
    if (instructions === null || save.isLocked || instructions[field] === value) return

    // Only the changed instruction is sent, so a change made on another device to a different one
    // is kept.
    const body: SaveMatchInstructionsRequest = {
      matchId: instructions.matchId,
      leagueTeamId: instructions.leagueTeamId,
      [field]: value,
    }

    save.send(() => saveMatchInstructions(body), replaceInstructions, {
      failedMessage: INSTRUCTIONS_SAVE_FAILED_MESSAGE,
      refreshMessage: INSTRUCTIONS_REFRESH_MESSAGE,
    })
  }

  return { change }
}
