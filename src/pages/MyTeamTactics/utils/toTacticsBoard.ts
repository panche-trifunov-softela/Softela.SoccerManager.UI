import { LAST_STARTER_SLOT, WIDE_INSTRUCTION_FIELDS } from '../constants'

import { isSameSituation } from './isSameSituation'
import { toLineupIndex } from './toLineupIndex'
import { toNextMatchHeader } from './toNextMatchHeader'
import { toSelectionHint } from './toSelectionHint'
import { toSituationLabel } from './toSituationLabel'
import { toSlotViews } from './toSlotViews'
import { toSquadGroups } from './toSquadGroups'

import type { LeagueTeamSquadMemberDto } from '@/types/leagueTeamSquadMemberDto'
import type { NextMatchDto } from '@/types/nextMatchDto'

import type { TacticsBoard, TacticsEditors, TacticsRead } from '../types'

/**
 * Assembles the props of every part of the board from a finished read and the editors' state.
 *
 * - Slots 1 to 11 go to the pitch and the rest to the bench.
 * - The formations and the instructions keep the API's order.
 * - Every control hands its action to its editor.
 * - The team instructions share the lock with the lineup.
 * - While a situation is open Auto pick and Remove are gone, and only the lineup's players can be
 *   tapped.
 * - The saved situations are listed in the API's order, named by its labels, with the open one
 *   marked.
 *
 * @param nextMatch The club's next match as the board shows it: the open situation's saved lineup
 * and instructions in place of the main ones.
 * @param read The finished read for the club, which holds its squad, the formations and the
 * instructions on offer.
 * @param editors The board's shared save and the editors' state and actions.
 * @returns The board's props.
 */
export function toTacticsBoard(
  nextMatch: NextMatchDto,
  read: TacticsRead,
  editors: TacticsEditors,
): TacticsBoard {
  const { lineup } = nextMatch

  const { save, lineup: editor, instructions, situation } = editors

  const { selection } = editor

  const { window: situationWindow } = situation

  const isSituationOpen = situation.open !== null

  const { isLocked } = save

  const squadById = new Map<number, LeagueTeamSquadMemberDto>(
    read.squad.map((member) => [member.playerId, member]),
  )

  const index = toLineupIndex(lineup)

  const slotViews = toSlotViews(lineup, squadById, selection, isSituationOpen)

  return {
    header: toNextMatchHeader(nextMatch),
    toolbar: {
      formations: read.formations.map(({ id, name }) => ({ id, name })),
      formationId: lineup.formationId,
      isLocked,
      selectionHint: toSelectionHint(selection, index, squadById, slotViews),
      canRemove:
        !isSituationOpen &&
        selection?.kind === 'slot' &&
        index.playerBySlot.has(selection.slotNumber),
      hasSelection: selection !== null,
      canAutoPick: !isSituationOpen,
      situationControls: {
        isOpen: isSituationOpen,
        canAdd: situationWindow.canAdd,
        isLocked,
        minuteLabel: situationWindow.minuteLabel,
        minuteOptions: situationWindow.minuteOptions,
        minuteAt: situation.open?.minuteAt ?? null,
        situationLabel: situationWindow.situationLabel,
        situationOptions: situationWindow.situationOptions,
        situation: situation.open?.situation ?? null,
        onAdd: situation.add,
        onClose: situation.close,
        onMinuteChange: situation.changeMinute,
        onSituationChange: situation.changeSituation,
      },
      savedSituations: {
        items: read.situations.map((saved) => ({
          minuteAt: saved.minuteAt,
          situation: saved.situation,
          label: toSituationLabel(saved, situationWindow),
          isOpen: situation.open !== null && isSameSituation(situation.open, saved),
        })),
        isLocked,
        onEdit: situation.edit,
        onDelete: situation.remove,
      },
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
      ...toSquadGroups(read.squad, index, selection, slotViews, isSituationOpen),
      isLocked,
      onPlayerTap: editor.tapPlayer,
    },
    instructions: {
      controls: read.instructionDefinitions.map((definition) => ({
        ...definition,
        isWide: WIDE_INSTRUCTION_FIELDS.includes(definition.field),
      })),
      values: nextMatch.instructions,
      isLocked,
      onChange: instructions.change,
    },
  }
}
