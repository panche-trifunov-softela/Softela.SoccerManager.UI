import type { InstructionField } from './instructionField'
import type { InstructionOptionDto } from './instructionOptionDto'

/**
 * One of a club's instructions for a match as the page offers it, as
 * `GET /api/matches/instruction-options` returns it.
 *
 * Mirrors `InstructionDefinitionDto` on the backend.
 */
export interface InstructionDefinitionDto {
  /** The instruction's name in `MatchInstructionsDto`. */
  field: InstructionField

  /** What the instruction is called on screen, for example `Attacking side`. */
  label: string

  /** The instruction's choices, lowest number first. */
  options: InstructionOptionDto[]
}
