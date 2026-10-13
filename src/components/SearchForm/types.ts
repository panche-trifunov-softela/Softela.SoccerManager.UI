import type { ChangeEventHandler, SubmitEventHandler } from 'react'

/** What `SearchForm` is handed. */
export interface SearchFormProps {
  /** The input's placeholder, also used as its accessible name. */
  placeholder: string

  /** The submit button's accessible name. */
  buttonLabel: string

  /** The most characters the input accepts. */
  maxLength: number

  /** The id of the text that describes the input, if there is any. */
  describedBy?: string

  /** Extra classes for the form. */
  className?: string

  /** Called with the typed value each time the search is submitted. */
  onSearch: (value: string) => void
}

/** What `useSearchForm` exposes to the view. */
export interface SearchFormState {
  /** The value typed so far, not yet submitted. */
  draft: string

  /** Keeps `draft` in step with the input. */
  onDraftChange: ChangeEventHandler<HTMLInputElement>

  /** Submits `draft` without reloading the page. */
  onSubmit: SubmitEventHandler<HTMLFormElement>
}
