import type { InstructionField } from './instructionField'
import type { InstructionOptionDto } from './instructionOptionDto'

/**
 * One choice the page offers with its options, as `GET /api/matches/instruction-options` and
 * `GET /api/matches/substitution-options` return it.
 *
 * Mirrors `InstructionDefinitionDto` on the backend, which types `field` as a plain string; the
 * parameter narrows it to the names the route sends.
 *
 * @template TField The names the route sends in `field`: an instruction's by default.
 */
export interface InstructionDefinitionDto<TField extends string = InstructionField> {
  /**
   * The choice's name: an instruction's in `MatchInstructionsDto` or a substitution's in
   * `MatchSubstitutionDto`.
   */
  field: TField

  /** What the choice is called on screen, for example `Attacking side` or `Minute at`. */
  label: string

  /** The options to pick from, lowest number first. */
  options: InstructionOptionDto[]
}
