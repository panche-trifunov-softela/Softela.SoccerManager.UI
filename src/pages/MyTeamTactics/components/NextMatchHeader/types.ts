/** What `NextMatchHeader` is handed. */
export interface NextMatchHeaderProps {
  /** The opponent's name, or the sentence that says it is to be decided. */
  opponentName: string

  /** The address of the opponent's crest, or `null` when there is none. */
  opponentLogoUrl: string | null

  /** Whether the club plays at home or away, in words. */
  venueLabel: string

  /** When the match starts, written in the reader's locale. */
  kickOff: string
}
