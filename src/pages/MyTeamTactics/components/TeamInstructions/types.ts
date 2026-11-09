import type { InstructionDefinitionDto } from '@/types/instructionDefinitionDto'
import type { InstructionField } from '@/types/instructionField'
import type { MatchInstructionsDto } from '@/types/matchInstructionsDto'

/** The instructions' values, without the match and the club they belong to. */
export type InstructionValues = Pick<MatchInstructionsDto, InstructionField>

/** One instruction's select: the instruction as the API offers it, and how it is laid out. */
export interface InstructionControl extends InstructionDefinitionDto {
  /** Whether the select spans the card's full width, because its choices read long. */
  isWide: boolean
}

/** What `TeamInstructions` is handed. */
export interface TeamInstructionsProps {
  /** The instructions' selects, in the order they are laid out. */
  controls: readonly InstructionControl[]

  /** The instructions as the server last said them. */
  values: InstructionValues

  /** Whether the board refuses input, because a request is in flight. */
  isLocked: boolean

  /** Called with an instruction and the chosen number when one of the selects changes. */
  onChange: (field: InstructionField, value: number) => void
}
