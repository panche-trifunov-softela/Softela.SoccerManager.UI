/**
 * One player who went to the selling club as part of a swap, as the `swapPlayers` of a
 * `PlayerTransferDto` lists them.
 *
 * Mirrors `PlayerTransferSwapPlayerDto` on the backend.
 */
export interface PlayerTransferSwapPlayerDto {
  /** The identifier of the player. */
  playerId: number

  /** The name of the player. */
  name: string
}
