import type { SlotView } from '../../types'

/** What `SlotMarker` is handed. */
export interface SlotMarkerProps {
  /** The slot to draw. */
  slot: SlotView

  /** Whether the board refuses input, because a request is in flight. */
  isLocked: boolean

  /** Called with the slot's number when the marker is tapped. */
  onTap: (slotNumber: number) => void
}
