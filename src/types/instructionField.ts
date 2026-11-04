import type { MatchInstructionsDto } from './matchInstructionsDto'

/** One of the instructions a club gives for a match, by its name in `MatchInstructionsDto`. */
export type InstructionField = Exclude<keyof MatchInstructionsDto, 'matchId' | 'leagueTeamId'>
