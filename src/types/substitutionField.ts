import type { MatchSubstitutionDto } from './matchSubstitutionDto'

/** One of the two choices a substitution is picked by, by its name in `MatchSubstitutionDto`. */
export type SubstitutionField = Extract<keyof MatchSubstitutionDto, 'minuteAt' | 'situation'>
