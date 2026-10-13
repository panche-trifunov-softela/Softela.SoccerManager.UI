/** What `LeagueSearchForm` is handed. */
export interface LeagueSearchFormProps {
  /** Called with the typed value each time the search is submitted. */
  onSearch: (value: string) => void
}

/** What `useLeagueSearchForm` exposes to the view. */
export interface LeagueSearchFormState {
  /** The id that ties the hint to the input it describes. */
  hintId: string
}
