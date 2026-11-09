/** One choice a situation's dropdown offers. */
export interface SituationOption {
  /** The number the API uses for the choice. */
  value: number

  /** What the choice is called on screen, as the API names it. */
  label: string

  /** Whether the choice cannot be picked: a minute outside the club's window. */
  isDisabled: boolean
}

/** What `SituationControls` is handed. */
export interface SituationControlsProps {
  /** Whether a situation is open, so its dropdowns show in place of Add situation. */
  isOpen: boolean

  /** Whether Add situation can open one. */
  canAdd: boolean

  /** Whether the board refuses input, because a request is in flight or the data is read again. */
  isLocked: boolean

  /** What the minute's dropdown is called. */
  minuteLabel: string

  /** The minutes to choose from. */
  minuteOptions: SituationOption[]

  /** The open situation's minute, or `null` while none is open. */
  minuteAt: number | null

  /** What the situation's dropdown is called. */
  situationLabel: string

  /** The situations to choose from. */
  situationOptions: SituationOption[]

  /** The open situation's situation, or `null` while none is open. */
  situation: number | null

  /** Called when Add situation is pressed. */
  onAdd: () => void

  /** Called when Close Situation is pressed. */
  onClose: () => void

  /** Called with the chosen minute when the minute's dropdown changes. */
  onMinuteChange: (minuteAt: number) => void

  /** Called with the chosen situation when the situation's dropdown changes. */
  onSituationChange: (situation: number) => void
}
