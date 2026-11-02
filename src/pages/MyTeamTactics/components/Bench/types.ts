import type { SlotView } from '../../types'

/** What `Bench` is handed. */
export interface BenchProps {
  /** The reserve slots, in slot order. */
  slots: SlotView[]

  /** Whether the board refuses input, because a request is in flight. */
  isLocked: boolean

  /** Called with a slot's number when its marker is tapped. */
  onSlotTap: (slotNumber: number) => void
}
