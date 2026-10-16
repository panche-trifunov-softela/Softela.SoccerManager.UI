import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import type { PagerProps } from './types'

/**
 * The strip under the table: where the reader is, and buttons for the
 * previous and next page.
 *
 * @param props The summary to show, which directions are open, and what to
 * call when a button is pressed. A closed direction's button is marked
 * `aria-disabled` rather than `disabled`, so it keeps focus and pressing it
 * does nothing.
 * @returns The rendered pager.
 */
export function Pager({ summary, canGoBack, canGoForward, onPrevious, onNext }: PagerProps) {
  return (
    <div className="card_footer--sm justify-content-between g-12">
      <span className="text-12" role="status">
        {summary}
      </span>

      <div className="d-flex g-8">
        <button
          type="button"
          className="btn btn--outlined btn--square focus-ring"
          aria-label="Previous page"
          aria-disabled={!canGoBack}
          onClick={onPrevious}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        <button
          type="button"
          className="btn btn--outlined btn--square focus-ring"
          aria-label="Next page"
          aria-disabled={!canGoForward}
          onClick={onNext}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  )
}
