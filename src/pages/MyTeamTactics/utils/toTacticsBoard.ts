import { LAST_STARTER_SLOT, SAVE_STATUS_LABELS } from '../constants'

import { toLineupIndex } from './toLineupIndex'
import { toNextMatchHeader } from './toNextMatchHeader'
import { toSelectionHint } from './toSelectionHint'
import { toSlotViews } from './toSlotViews'
import { toSquadGroups } from './toSquadGroups'

import type { LeagueTeamSquadMemberDto } from '@/types/leagueTeamSquadMemberDto'
import type { NextMatchDto } from '@/types/nextMatchDto'

import type { LineupEditorState, TacticsBoard, TacticsRead } from '../types'

/**
 * Assembles the props of every part of the board from a finished read and the editor's state.
 *
 * - Slots 1 to 11 go to the pitch and the rest to the bench.
 * - The formations keep the API's order.
 * - Every control hands its action to the editor.
 *
 * @param nextMatch The club's next match, whose lineup the board shows.
 * @param read The finished read for the club, which holds its squad and the formations.
 * @param editor The editor's state and actions.
 * @returns The board's props.
 */
export function toTacticsBoard(
  nextMatch: NextMatchDto,
  read: TacticsRead,
  editor: LineupEditorState,
): TacticsBoard {
  const { lineup } = nextMatch

  const { selection, isLocked } = editor

  const squadById = new Map<number, LeagueTeamSquadMemberDto>(
    read.squad.map((member) => [member.playerId, member]),
  )

  const index = toLineupIndex(lineup)

  const slotViews = toSlotViews(lineup, squadById, selection)

  return {
    header: toNextMatchHeader(nextMatch),
    toolbar: {
      formations: read.formations.map(({ id, name }) => ({ id, name })),
      formationId: lineup.formationId,
      isLocked,
      saveStatus: SAVE_STATUS_LABELS[editor.saveState],
      selectionHint: toSelectionHint(selection, index, squadById, slotViews),
      canRemove: selection?.kind === 'slot' && index.playerBySlot.has(selection.slotNumber),
      hasSelection: selection !== null,
      onFormationChange: editor.changeFormation,
      onAutoPick: editor.autoPick,
      onRemove: editor.removeSelected,
      onCancel: editor.clearSelection,
    },
    pitch: {
      slots: slotViews.filter(({ slotNumber }) => slotNumber <= LAST_STARTER_SLOT),
      isLocked,
      onSlotTap: editor.tapSlot,
    },
    bench: {
      slots: slotViews.filter(({ slotNumber }) => slotNumber > LAST_STARTER_SLOT),
      isLocked,
      onSlotTap: editor.tapSlot,
    },
    squad: {
      ...toSquadGroups(read.squad, index, selection, slotViews),
      isLocked,
      onPlayerTap: editor.tapPlayer,
    },
  }
}
