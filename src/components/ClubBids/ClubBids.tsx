import { AnswerButtons } from '@/components/AnswerButtons'
import { HistoryList } from '@/components/HistoryList'
import { PageTitle } from '@/components/PageTitle'
import { ROUTES } from '@/constants/routes'

import { BACK_TO_MY_TEAMS_LABEL } from './constants'
import { useClubBids } from './useClubBids'

import styles from './ClubBids.module.scss'

import type { ClubBidActions, ClubBidsProps } from './types'

/**
 * Draws what a row of the list has at its end: its answer buttons, the state of its deal, or
 * nothing.
 *
 * @param actions What the row has at its end.
 * @returns The buttons or the tag, or `null` for a row with neither.
 */
function renderBidActions(actions: ClubBidActions) {
  if (actions === null) return null

  if (actions.kind === 'answer') return <AnswerButtons {...actions.props} />

  return (
    <span className={`tag tag--inline ${styles[`status--${actions.status}`]}`}>
      {actions.label}
    </span>
  )
}

/**
 * A club's bids of one kind, placed and received: the pending ones first, then the completed
 * ones, each section saying so when it has none.
 *
 * - A row's player opens his profile in the side panel.
 * - A pending bid the club received carries the buttons that accept or reject it; a completed one
 *   says whether its deal is accepted or completed.
 * - While the bids load, or when they could not be read, a message shows in a live region instead.
 *
 * @param props Which kind of bid to list.
 * @returns The rendered page.
 */
export function ClubBids({ kind }: ClubBidsProps) {
  const { title, subtitle, message, sections, actionsFor, openPlayer } = useClubBids(kind)

  return (
    <div className="d-flex flex-column g-20">
      <PageTitle
        title={title}
        subtitle={subtitle}
        backTo={ROUTES.home}
        backLabel={BACK_TO_MY_TEAMS_LABEL}
      />

      <div role="status">{message !== null && <p className="label">{message}</p>}</div>

      {sections.map((section) => (
        <section key={section.id} className={`card card-padded ${styles.section}`}>
          <h2 className="h4">{section.heading}</h2>

          {section.items.length > 0 ? (
            <HistoryList
              items={section.items}
              onTitleClick={openPlayer}
              renderActions={(key) => renderBidActions(actionsFor(key))}
            />
          ) : (
            <p className="label">{section.emptyMessage}</p>
          )}
        </section>
      ))}
    </div>
  )
}
