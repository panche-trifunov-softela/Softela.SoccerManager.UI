import { PITCH_FULL_ROOM, PITCH_LINE_BAND } from '../constants'

import type { ScreenPoint } from '../types'

/**
 * Works out how wide each placed marker may be: the distance to its nearest neighbour in the same
 * line, so the markers of a crowded line never overlap.
 *
 * Two markers are in one line when they sit within `PITCH_LINE_BAND` of each other down the board,
 * so a line that is not quite flat still counts as one.
 *
 * @param points Where each placed slot sits, by slot number.
 * @returns Each placed slot's room by slot number, in percent of the board's width. A marker alone
 * in its line has `PITCH_FULL_ROOM`.
 */
export function toSlotRooms(points: ReadonlyMap<number, ScreenPoint>): ReadonlyMap<number, number> {
  const rooms = new Map<number, number>()

  for (const [slotNumber, point] of points) {
    let room = PITCH_FULL_ROOM

    for (const [otherNumber, other] of points) {
      if (otherNumber !== slotNumber && Math.abs(other.y - point.y) < PITCH_LINE_BAND) {
        room = Math.min(room, Math.abs(other.x - point.x))
      }
    }

    rooms.set(slotNumber, room)
  }

  return rooms
}
