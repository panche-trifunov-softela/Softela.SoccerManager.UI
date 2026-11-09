import type { MatchInstructionsDto } from './matchInstructionsDto'
import type { MatchLineupDto } from './matchLineupDto'

/**
 * One of a club's substitutions for a match: the lineup and the instructions it switches to at one
 * minute when the score is in one situation, as the substitution endpoints return it.
 *
 * Mirrors `MatchSubstitutionDto` on the backend.
 */
export interface MatchSubstitutionDto {
  /** The minute of the match the substitution takes effect at: 45, 60 or 75. */
  minuteAt: number

  /** The state of the score the substitution is for, by the number the API uses for it. */
  situation: number

  /** The lineup the club switches to; each slot says how the substitution moves its player. */
  lineup: MatchLineupDto

  /** The instructions the club switches to. */
  instructions: MatchInstructionsDto
}
