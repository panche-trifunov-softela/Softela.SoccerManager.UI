/** How big a player's photo is drawn. */
export type PlayerPhotoSize = 'md' | 'lg'

/** What `PlayerPhoto` is handed. */
export interface PlayerPhotoProps {
  /** The address of the player's photo; `null` or blank when there is none. */
  imageUrl: string | null

  /**
   * The photo's size: `md`, the default, is the 40px photo of a table row, `lg` the 80px one of a
   * panel header.
   */
  size?: PlayerPhotoSize
}
