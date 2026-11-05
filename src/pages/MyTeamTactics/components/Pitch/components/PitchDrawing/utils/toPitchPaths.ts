import { toScreenPoint } from '@/pages/MyTeamTactics/utils/toScreenPoint'

import {
  ARC_SEGMENTS,
  BAND_LENGTH,
  CIRCLE_RADIUS,
  CIRCLE_SEGMENTS,
  CORNER_ARC_RADIUS,
  CORNER_SEGMENTS,
  GOAL_AREA_DEPTH,
  GOAL_AREA_WIDTH,
  GOAL_HEIGHT,
  GOAL_WIDTH,
  NET_COLUMNS,
  NET_RISE,
  NET_ROWS,
  NET_TOP_INSET,
  PENALTY_AREA_DEPTH,
  PENALTY_AREA_WIDTH,
  PENALTY_SPOT_DISTANCE,
  PITCH_LENGTH,
  PITCH_WIDTH,
  RUN_OFF_END,
  RUN_OFF_SIDE,
  SPOT_RADIUS,
  SPOT_SEGMENTS,
} from '../constants'

import type { ScreenPoint } from '@/pages/MyTeamTactics/types'

import type { MetrePoint, PitchPaths } from '../types'

/**
 * Writes a point of the board as path data.
 *
 * @param point The point, in percent of the board.
 * @returns The point as `x y`, to two decimals.
 */
function toCoordinates(point: ScreenPoint): string {
  return `${point.x.toFixed(2)} ${point.y.toFixed(2)}`
}

/**
 * Puts a point of the pitch on the board, in perspective.
 *
 * @param point The point, in metres from the pitch's own corner.
 * @returns The point as `x y` in percent of the board, to two decimals.
 */
function toBoard([x, y]: MetrePoint): string {
  return toCoordinates(toScreenPoint((x / PITCH_WIDTH) * 100, (y / PITCH_LENGTH) * 100))
}

/**
 * Joins written points into path data.
 *
 * @param coordinates The points, each written as `x y`.
 * @param isClosed Whether the path returns to its first point.
 * @returns The path data: a move to the first point, a line to each other one, and a close when
 * asked.
 */
function toPath(coordinates: readonly string[], isClosed: boolean): string {
  const path = coordinates.map((point, index) => `${index === 0 ? 'M' : 'L'}${point}`).join('')

  return isClosed ? `${path}Z` : path
}

/**
 * Draws a line through points of the pitch.
 *
 * @param points The points, in metres from the pitch's own corner.
 * @param isClosed Whether the line returns to its first point.
 * @returns The path data, in percent of the board.
 */
function toLine(points: readonly MetrePoint[], isClosed: boolean): string {
  return toPath(points.map(toBoard), isClosed)
}

/**
 * Draws a line through points of the board.
 *
 * @param points The points, in percent of the board.
 * @param isClosed Whether the line returns to its first point.
 * @returns The path data, in percent of the board.
 */
function toScreenLine(points: readonly ScreenPoint[], isClosed: boolean): string {
  return toPath(points.map(toCoordinates), isClosed)
}

/**
 * Samples an arc of a circle on the pitch.
 *
 * @param cx How far across the pitch the circle's centre is, in metres.
 * @param cy How far along the pitch the circle's centre is, in metres.
 * @param radius The circle's radius, in metres.
 * @param from The angle the arc starts at, in radians.
 * @param to The angle the arc ends at, in radians.
 * @param segments How many straight segments make the arc.
 * @returns The `segments + 1` points of the arc, in order.
 */
function toArc(
  cx: number,
  cy: number,
  radius: number,
  from: number,
  to: number,
  segments: number,
): MetrePoint[] {
  return Array.from({ length: segments + 1 }, (_, index) => {
    const angle = from + ((to - from) * index) / segments

    return [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)] as const
  })
}

/**
 * Samples a whole circle on the pitch.
 *
 * @param cx How far across the pitch the circle's centre is, in metres.
 * @param cy How far along the pitch the circle's centre is, in metres.
 * @param radius The circle's radius, in metres.
 * @param segments How many straight segments make the circle.
 * @returns The `segments` points of the circle, without the first one repeated at the end.
 */
function toCircle(cx: number, cy: number, radius: number, segments: number): MetrePoint[] {
  return toArc(cx, cy, radius, 0, 2 * Math.PI, segments).slice(0, -1)
}

/**
 * Gives the four corners of a rectangle on the pitch.
 *
 * @param x0 The rectangle's first side across the pitch, in metres.
 * @param y0 The rectangle's first side along the pitch, in metres.
 * @param x1 The rectangle's second side across the pitch, in metres.
 * @param y1 The rectangle's second side along the pitch, in metres.
 * @returns The corners, in order round the rectangle.
 */
function toRect(x0: number, y0: number, x1: number, y1: number): MetrePoint[] {
  return [
    [x0, y0],
    [x1, y0],
    [x1, y1],
    [x0, y1],
  ]
}

/**
 * Draws the darker mowing bands, every other one from the far end. The lighter ones are the turf
 * showing between them.
 *
 * @returns The path data of the even bands.
 */
function toDarkBands(): string {
  const dark: string[] = []

  let index = 0

  for (let y = -RUN_OFF_END; y < PITCH_LENGTH + RUN_OFF_END; y += BAND_LENGTH) {
    if (index % 2 === 0) {
      dark.push(
        toLine(toRect(-RUN_OFF_SIDE, y, PITCH_WIDTH + RUN_OFF_SIDE, y + BAND_LENGTH), true),
      )
    }

    index += 1
  }

  return dark.join('')
}

/**
 * Draws the markings of one end of the pitch: the penalty area, the goal area, the penalty arc and
 * the two corner arcs.
 *
 * @param isFar Whether it is the far end, where the goal line is at 0 metres; otherwise the near
 * end is drawn, as the far one mirrored along the pitch.
 * @returns The path data of the end's lines.
 */
function toEndLines(isFar: boolean): string {
  const place = (points: readonly MetrePoint[]): MetrePoint[] =>
    points.map(([x, y]) => [x, isFar ? y : PITCH_LENGTH - y])

  const middle = PITCH_WIDTH / 2

  const penaltyLeft = middle - PENALTY_AREA_WIDTH / 2

  const penaltyRight = middle + PENALTY_AREA_WIDTH / 2

  const goalLeft = middle - GOAL_AREA_WIDTH / 2

  const goalRight = middle + GOAL_AREA_WIDTH / 2

  const penaltyAngle = Math.asin((PENALTY_AREA_DEPTH - PENALTY_SPOT_DISTANCE) / CIRCLE_RADIUS)

  const lines = [
    [
      [penaltyLeft, 0],
      [penaltyLeft, PENALTY_AREA_DEPTH],
      [penaltyRight, PENALTY_AREA_DEPTH],
      [penaltyRight, 0],
    ],
    [
      [goalLeft, 0],
      [goalLeft, GOAL_AREA_DEPTH],
      [goalRight, GOAL_AREA_DEPTH],
      [goalRight, 0],
    ],
    toArc(
      middle,
      PENALTY_SPOT_DISTANCE,
      CIRCLE_RADIUS,
      penaltyAngle,
      Math.PI - penaltyAngle,
      ARC_SEGMENTS,
    ),
    toArc(0, 0, CORNER_ARC_RADIUS, 0, Math.PI / 2, CORNER_SEGMENTS),
    toArc(PITCH_WIDTH, 0, CORNER_ARC_RADIUS, Math.PI / 2, Math.PI, CORNER_SEGMENTS),
  ] as const

  return lines.map((points) => toLine(place(points), false)).join('')
}

/**
 * Draws the goal on the far goal line, standing up from it.
 *
 * - The goal is not projected in height: its bottom corners are put on the board, and its crossbar
 *   and the top of its net are drawn straight above them.
 * - The net narrows towards its top, and its cords are interpolated inside that shape.
 *
 * @returns The path data of the net, of its cords and of the frame.
 */
function toGoal(): Pick<PitchPaths, 'goalNet' | 'goalNetLines' | 'goalFrame'> {
  const middle = PITCH_WIDTH / 2

  const left = toScreenPoint(((middle - GOAL_WIDTH / 2) / PITCH_WIDTH) * 100, 0)

  const right = toScreenPoint(((middle + GOAL_WIDTH / 2) / PITCH_WIDTH) * 100, 0)

  const inset = Math.abs(right.x - left.x) * NET_TOP_INSET

  const direction = right.x > left.x ? 1 : -1

  const crossbarY = left.y - GOAL_HEIGHT

  const netTopY = crossbarY - NET_RISE

  const topLeft = { x: left.x + direction * inset, y: netTopY }

  const topRight = { x: right.x - direction * inset, y: netTopY }

  const between = (from: ScreenPoint, to: ScreenPoint, share: number): ScreenPoint => ({
    x: from.x + (to.x - from.x) * share,
    y: from.y + (to.y - from.y) * share,
  })

  const columns = Array.from({ length: NET_COLUMNS - 1 }, (_, index) => {
    const share = (index + 1) / NET_COLUMNS

    const bottom = between(left, right, share)

    const top = between(topLeft, topRight, share)

    return toScreenLine([bottom, top], false)
  })

  const rows = Array.from({ length: NET_ROWS - 1 }, (_, index) => {
    const share = (index + 1) / NET_ROWS

    const start = between(left, topLeft, share)

    const end = between(right, topRight, share)

    return toScreenLine([start, end], false)
  })

  return {
    goalNet: toScreenLine([left, right, topRight, topLeft], true),
    goalNetLines: [...columns, ...rows].join(''),
    goalFrame: toScreenLine(
      [left, { x: left.x, y: crossbarY }, { x: right.x, y: crossbarY }, right],
      false,
    ),
  }
}

/**
 * Draws the whole pitch as path data, in percent of the board.
 *
 * - The darker mowing bands run across the pitch, and the turf shows between them as the lighter
 *   ones.
 * - The run-off is the grass beyond the lines; the lines and the spots are the markings.
 * - The goal stands on the far goal line.
 *
 * @returns The path data of every part of the drawing.
 */
export function toPitchPaths(): PitchPaths {
  const middle = PITCH_WIDTH / 2

  const turf = toLine(
    toRect(-RUN_OFF_SIDE, -RUN_OFF_END, PITCH_WIDTH + RUN_OFF_SIDE, PITCH_LENGTH + RUN_OFF_END),
    true,
  )

  const pitch = toLine(toRect(0, 0, PITCH_WIDTH, PITCH_LENGTH), true)

  const halfway = toLine(
    [
      [0, PITCH_LENGTH / 2],
      [PITCH_WIDTH, PITCH_LENGTH / 2],
    ],
    false,
  )

  const centreCircle = toLine(
    toCircle(middle, PITCH_LENGTH / 2, CIRCLE_RADIUS, CIRCLE_SEGMENTS),
    true,
  )

  const spotCentres = [
    [middle, PENALTY_SPOT_DISTANCE],
    [middle, PITCH_LENGTH - PENALTY_SPOT_DISTANCE],
    [middle, PITCH_LENGTH / 2],
  ] as const

  return {
    darkBands: toDarkBands(),
    runOff: `${turf}${pitch}`,
    spots: spotCentres
      .map(([x, y]) => toLine(toCircle(x, y, SPOT_RADIUS, SPOT_SEGMENTS), true))
      .join(''),
    lines: [pitch, halfway, centreCircle, toEndLines(true), toEndLines(false)].join(''),
    turf,
    ...toGoal(),
  }
}
