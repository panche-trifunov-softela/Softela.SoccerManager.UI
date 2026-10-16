import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useSearchForm } from './useSearchForm'

import type { SearchFormProps } from './types'

/**
 * A search box: a text input and a button, submitted with Enter or the button.
 *
 * @param props The input's and button's names, the longest search, and what to
 * call when a search is submitted.
 * @returns The rendered search form.
 */
export function SearchForm({
  placeholder,
  buttonLabel,
  maxLength,
  describedBy,
  className,
  onSearch,
}: SearchFormProps) {
  const { draft, onDraftChange, onSubmit } = useSearchForm(onSearch)

  return (
    <form
      role="search"
      className={className === undefined ? 'd-flex g-8' : `d-flex g-8 ${className}`}
      onSubmit={onSubmit}
    >
      <input
        type="search"
        className="field"
        value={draft}
        onChange={onDraftChange}
        maxLength={maxLength}
        placeholder={placeholder}
        aria-label={placeholder}
        aria-describedby={describedBy}
      />

      <button type="submit" className="btn btn--square focus-ring" aria-label={buttonLabel}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </form>
  )
}
