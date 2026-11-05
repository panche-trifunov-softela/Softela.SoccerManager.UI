/** A point on the pitch in metres from its own corner: across the pitch, then along it. */
export type MetrePoint = readonly [number, number]

/** The pitch's drawing as the path data of its parts, in percent of the board. */
export interface PitchPaths {
  /**
   * The even mowing bands, which are the darker ones. The lighter ones are the turf showing
   * between them, so the page can never show through where two bands meet.
   */
  darkBands: string

  /** The grass beyond the lines, outlined with the whole turf so that only it is filled. */
  runOff: string

  /** The penalty spots and the centre spot. */
  spots: string

  /** The touchlines, goal lines, halfway line, circle, areas and arcs, as strokes. */
  lines: string

  /** The whole turf, run-off included, which also gives the lighter bands. */
  turf: string

  /** The goal's net as a closed shape. */
  goalNet: string

  /** The cords of the goal's net, as strokes. */
  goalNetLines: string

  /** The goal's posts and crossbar, as one stroke. */
  goalFrame: string
}
