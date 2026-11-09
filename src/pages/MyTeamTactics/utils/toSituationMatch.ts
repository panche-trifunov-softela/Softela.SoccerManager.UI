import { isSameSituation } from './isSameSituation'

import type { MatchSubstitutionDto } from '@/types/matchSubstitutionDto'
import type { NextMatchDto } from '@/types/nextMatchDto'

import type { SituationKey } from '../types'

/**
 * Works out the match as the board shows it: with the open substitution's saved lineup and
 * instructions in place of the main ones.
 *
 * - With no match, there is nothing to show: `null`.
 * - With no substitution open, or nothing saved for the open one, the match itself.
 * - Otherwise the match with the lineup and the instructions of the saved substitution that has the
 *   open key.
 *
 * @param nextMatch The club's next match with its main lineup, or `null` when there is none.
 * @param situations The club's saved substitutions for that match.
 * @param open The open substitution, or `null` when the main lineup is edited.
 * @returns The match as shown, or `null` when there is no match.
 */
export function toSituationMatch(
  nextMatch: NextMatchDto | null,
  situations: readonly MatchSubstitutionDto[],
  open: SituationKey | null,
): NextMatchDto | null {
  if (nextMatch === null || open === null) return nextMatch

  const saved = situations.find((situation) => isSameSituation(situation, open))

  if (saved === undefined) return nextMatch

  return { ...nextMatch, lineup: saved.lineup, instructions: saved.instructions }
}
