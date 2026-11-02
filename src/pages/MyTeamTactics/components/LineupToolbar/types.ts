import type { RefObject } from 'react'

import type { FormationDto } from '@/types/formationDto'

/** A formation the select offers: its identifier and its name, for example `4-3-3`. */
export type FormationOption = Pick<FormationDto, 'id' | 'name'>

/** What `LineupToolbar` is handed. */
export interface LineupToolbarProps {
  /** The formations to choose from, in the order to list them. */
  formations: FormationOption[]

  /** The identifier of the lineup's formation, or `null` when it has none. */
  formationId: number | null

  /** Whether the board refuses input, because a request is in flight. */
  isLocked: boolean

  /** Where the latest save stands, in words, or `null` to say nothing. */
  saveStatus: string | null

  /** What the next tap does, or an invitation to start while nothing is selected. */
  selectionHint: string

  /** Whether the selection is a filled slot, so it can be emptied. */
  canRemove: boolean

  /** Whether anything is selected. */
  hasSelection: boolean

  /** Called with the chosen formation's identifier when the select changes. */
  onFormationChange: (formationId: number) => void

  /** Called when the auto pick button is pressed. */
  onAutoPick: () => void

  /** Called when the button that empties the selected slot is pressed. */
  onRemove: () => void

  /** Called when the button that drops the selection is pressed. */
  onCancel: () => void
}

/** What `useLineupToolbar` is handed. */
export type LineupToolbarOptions = Pick<LineupToolbarProps, 'onRemove' | 'onCancel'>

/** What `useLineupToolbar` exposes to the view. */
export interface LineupToolbarState {
  /** Attached to the formation select, so focus can be sent back to it. */
  formationSelect: RefObject<HTMLSelectElement | null>

  /** Empties the selected slot, then moves focus to the formation select. */
  handleRemove: () => void

  /** Drops the selection, then moves focus to the formation select. */
  handleCancel: () => void
}
