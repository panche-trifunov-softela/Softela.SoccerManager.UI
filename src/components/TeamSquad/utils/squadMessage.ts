import { SQUAD_EMPTY_MESSAGE, SQUAD_LOADING_MESSAGE } from '../constants'

/**
 * Chooses what the panel says under the table: loading, that the read failed, or that the club
 * has no players.
 *
 * @param isLoading Whether the read for this club is still in flight.
 * @param error The fixed sentence that says the read failed, or `null` when it did not.
 * @param rowCount How many players the read found.
 * @returns The sentence to show, or `null` when the table shows players.
 */
export function squadMessage(
  isLoading: boolean,
  error: string | null,
  rowCount: number,
): string | null {
  if (isLoading) return SQUAD_LOADING_MESSAGE

  if (error !== null) return error

  if (rowCount === 0) return SQUAD_EMPTY_MESSAGE

  return null
}
