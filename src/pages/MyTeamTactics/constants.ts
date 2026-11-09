import type { InstructionField } from '@/types/instructionField'
import type { PositionFit } from '@/types/positionFit'
import type { SubstitutionDirection } from '@/types/substitutionDirection'

import type { SaveState } from './types'

/** What shows when the address names no valid league team id. */
export const CLUB_NOT_FOUND_MESSAGE = 'This club could not be found.'

/** What shows while the tactics are read. */
export const TACTICS_LOADING_MESSAGE = 'Loading the tactics…'

/** What shows, and is toasted when no better reason is known, when the tactics are not read. */
export const TACTICS_LOAD_FAILED_MESSAGE = 'The tactics could not be loaded.'

/** What shows when the club has no match to come. */
export const NO_NEXT_MATCH_MESSAGE = 'This club has no match to come.'

/** What shows when no complete formation exists, so there is no lineup to edit. */
export const NO_FORMATION_MESSAGE = 'No formation is available for a lineup yet.'

/** Toasted when a lineup change got no reply from the API. */
export const LINEUP_SAVE_FAILED_MESSAGE = 'The lineup could not be saved.'

/** Toasted when an auto pick got no reply from the API. */
export const AUTO_PICK_FAILED_MESSAGE = 'The lineup could not be picked.'

/** Toasted when a save fails inside the server, while the page reads its data again. */
export const LINEUP_REFRESH_MESSAGE = 'The lineup could not be saved, so it is being refreshed.'

/** Toasted when an instruction change got no reply from the API. */
export const INSTRUCTIONS_SAVE_FAILED_MESSAGE = 'The instructions could not be saved.'

/**
 * Toasted when an instruction save fails inside the server, while the page reads its data again.
 */
export const INSTRUCTIONS_REFRESH_MESSAGE =
  'The instructions could not be saved, so they are being refreshed.'

/** Toasted when a situation's delete got no reply from the API. */
export const SITUATION_DELETE_FAILED_MESSAGE = 'The situation could not be deleted.'

/**
 * Toasted when a situation's delete fails inside the server, while the page reads its data again.
 */
export const SITUATION_DELETE_REFRESH_MESSAGE =
  'The situation could not be deleted, so the situations are being refreshed.'

/** Joins a situation's minute and its situation in its name, for example `60 · Losing`. */
export const SITUATION_LABEL_SEPARATOR = ' · '

/** How each save state reads in the toolbar and the team instructions card; `null` says nothing. */
export const SAVE_STATUS_LABELS: Readonly<Record<SaveState, string | null>> = {
  idle: null,
  saving: 'Saving…',
  saved: 'Saved',
  failed: 'Not saved',
}

/** Names the opponent of a match that has no second participant yet. */
export const OPPONENT_TO_BE_DECIDED = 'Opponent to be decided'

/** The venue label of a match the club plays at home. */
export const HOME_VENUE_LABEL = 'Home'

/** The venue label of a match the club plays away. */
export const AWAY_VENUE_LABEL = 'Away'

/** Names a lineup player the squad does not list. */
export const UNKNOWN_PLAYER_NAME = 'Unknown player'

/** The label of a reserve slot, which asks for no position. */
export const BENCH_SLOT_LABEL = 'Sub'

/** The number of the last starter slot: slots 1 to this number are the starting eleven. */
export const LAST_STARTER_SLOT = 11

/**
 * The words for how well a player suits a slot's position, shown in the legend and announced on a
 * marker. A main position and another natural one read the same, so the user sees no difference
 * between them.
 */
export const POSITION_FIT_LABELS: Readonly<Record<PositionFit, string>> = {
  1: 'Natural position',
  2: 'Natural position',
  3: 'Can play here',
  4: 'Poor fit',
}

/** How wide the pitch is drawn at its far goal line, as a share of its near goal line. */
export const PITCH_FAR_WIDTH_RATIO = 0.74

/** The share of the board's width left free on each side of the near goal line. */
export const PITCH_SIDE_MARGIN = 0.03

/**
 * The share of the board's height left free above the far goal line: just enough for the grass
 * beyond that line to reach the board's top edge, with the goal standing on it.
 */
export const PITCH_TOP_MARGIN = 0.045

/** The share of the board's height left free under the near goal line. */
export const PITCH_BOTTOM_MARGIN = 0.02

/**
 * How far apart two markers may sit down the board, in percent of its height, and still count as
 * one line.
 */
export const PITCH_LINE_BAND = 8

/**
 * The room of a marker alone in its line, in percent of the board's width; the stylesheet's maximum
 * takes over from it.
 */
export const PITCH_FULL_ROOM = 100

/** The instructions whose select spans the card's full width, because their choices read long. */
export const WIDE_INSTRUCTION_FIELDS: readonly InstructionField[] = ['attackingSide']

/**
 * The API status of a failure inside the server. A save ends this way when another device's save
 * won the race: the lineup's, or the first save of the same instructions.
 */
export const SERVER_ERROR_STATUS = 500

/**
 * The API statuses after which the server's state may have moved on (a refused change, a match or
 * a club that is gone, a caller without access, a save that lost a race with another device), so
 * the page reads its data again.
 */
export const RELOAD_STATUSES: readonly number[] = [400, 403, 404, SERVER_ERROR_STATUS]

/** The key that drops the lineup selection. */
export const CLEAR_SELECTION_KEY = 'Escape'

/** What a screen reader announces for a slot with nobody in it. */
export const EMPTY_SLOT_DESCRIPTION = 'empty'

/** What a screen reader announces after a suspended player's name. */
export const SUSPENDED_DESCRIPTION = 'suspended'

/** What a screen reader announces after the name of a player a substitution moves. */
export const SUBSTITUTION_DESCRIPTIONS: Readonly<Record<SubstitutionDirection, string>> = {
  1: 'coming on',
  2: 'going off',
}

/** What a screen reader announces before a player's shirt number. */
export const NUMBER_DESCRIPTION = 'number'

/** What a screen reader announces before a player's rating. */
export const RATING_DESCRIPTION = 'rating'

/** What a screen reader announces for a player who has no rating. */
export const NO_RATING_DESCRIPTION = 'no rating'

/** What a screen reader announces before a player's condition. */
export const CONDITION_DESCRIPTION = 'condition'

/** What a screen reader announces before the label of the slot a player is in. */
export const IN_LINEUP_DESCRIPTION = 'in the lineup as'

/** What the selection line says while nothing is selected. */
export const NO_SELECTION_HINT = 'Tap a slot or a player to start.'

/** Follows the name of the player in the selected slot. */
export const MOVE_HINT_SUFFIX = ': tap a slot to move, or a player to swap in.'

/** Follows the name of the selected player who is not in the lineup. */
export const PLACE_HINT_SUFFIX = ': tap a slot to place.'

/** Comes before the label of the selected empty slot. */
export const PICK_HINT_PREFIX = 'Pick a player for '

/** Ends the sentence that asks for a player for the selected empty slot. */
export const PICK_HINT_SUFFIX = '.'
