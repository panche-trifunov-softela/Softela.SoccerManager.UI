import type { MatchOutcome } from '@/types/matchOutcome'

/** What `ScheduleTable` is handed. */
export interface ScheduleTableProps {
  /** The matches to show, in order. */
  rows: readonly ScheduleRow[]
}

/** One row of the schedule table: a match as the view shows it, its texts already written. */
export interface ScheduleRow {
  /** The match's id, unique per row. */
  key: number

  /** When the match starts, in the reader's locale and time zone. */
  kickOff: string

  /** The opponent's name, or the sentence that says it is not decided yet. */
  opponentName: string

  /** The address of the opponent's crest, or `null` when there is none. */
  opponentLogoUrl: string | null

  /** Whether the club plays at home or away, in words. */
  venueLabel: string

  /** The competition's name, or the word for a friendly. */
  competitionName: string

  /** The round or stage in the competition, or `null` when there is none to show. */
  stageName: string | null

  /**
   * The club's goals, an en dash, then the opponent's, or the missing mark until the match is
   * finished.
   */
  score: string

  /**
   * The shoot-out as the club's goals, an en dash, the opponent's and a word, or `null` when there
   * was none.
   */
  shootout: string | null

  /**
   * How the match ended for the club, which picks the pill's colour, or `null` until it is
   * finished.
   */
  outcome: MatchOutcome | null

  /** The outcome as a word, for assistive technology, or `null` until the match is finished. */
  outcomeLabel: string | null
}
