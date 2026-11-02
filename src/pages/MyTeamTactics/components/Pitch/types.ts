import type { SlotView } from '../../types'

/** What `Pitch` is handed. */
export interface PitchProps {
  /** The starting eleven's slots, in slot order. */
  slots: SlotView[]

  /** Whether the board refuses input, because a request is in flight. */
  isLocked: boolean

  /** Called with a slot's number when its marker is tapped. */
  onSlotTap: (slotNumber: number) => void
}
