import { OF_JOINER } from '../constants'

/**
 * Says how many of a group's matches are listed.
 *
 * @param count How many matches are listed.
 * @param total How many matched in all.
 * @returns For example `5 of 37`.
 */
export function toCutCountText(count: number, total: number): string {
  return `${count}${OF_JOINER}${total}`
}
