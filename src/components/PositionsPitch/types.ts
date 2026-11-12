/** One position's chip on the pitch, with its place already worked out. */
export interface PositionChip {
  /** The identifier of the position, unique among a player's positions. */
  positionId: number

  /** The short name of the position, for example `CB`, which the chip shows. */
  shortName: string

  /** Whether this is the player's main position, which the chip highlights. */
  isMain: boolean

  /** The chip's distance from the pitch's left edge, as a percentage of its width, for example `50%`. */
  left: string

  /** The chip's distance from the pitch's top edge, as a percentage of its height, for example `20%`. */
  top: string
}

/** What `PositionsPitch` is handed. */
export interface PositionsPitchProps {
  /** The chips to draw: the positions that have a place on the pitch, the main one first. */
  chips: readonly PositionChip[]

  /** What a screen reader hears for the drawing, listing every position, placed or not. */
  label: string
}
