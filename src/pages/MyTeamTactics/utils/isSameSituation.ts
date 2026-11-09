import type { SituationKey } from '../types'

/**
 * Tells whether two substitution keys name the same substitution.
 *
 * @param a The first key.
 * @param b The second key.
 * @returns Whether both have the same minute and the same situation.
 */
export function isSameSituation(a: SituationKey, b: SituationKey): boolean {
  return a.minuteAt === b.minuteAt && a.situation === b.situation
}
