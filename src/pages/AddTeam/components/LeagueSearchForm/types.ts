import type { ChangeEventHandler, SubmitEventHandler } from 'react'

/** What `LeagueSearchForm` is handed. */
export interface LeagueSearchFormProps {
  /** Called with the typed value each time the search is submitted. */
  onSearch: (value: string) => void
}

/** What `useLeagueSearchForm` exposes to the view. */
export interface LeagueSearchFormState {
  /** The value typed so far, not yet submitted. */
  draft: string

  /** The id that ties the hint to the input it describes. */
  hintId: string

  /** Keeps `draft` in step with the input. */
  onDraftChange: ChangeEventHandler<HTMLInputElement>

  /** Submits `draft` without reloading the page. */
  onSubmit: SubmitEventHandler<HTMLFormElement>
}
