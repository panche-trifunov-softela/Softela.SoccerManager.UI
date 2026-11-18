import { AnswerButtons } from '@/components/AnswerButtons'

import { BID_TYPE_TABS_LABEL } from '../../constants'
import { HistoryList } from '../HistoryList'
import { Tabs } from '../Tabs'

import { useReceivedBidsPanel } from './useReceivedBidsPanel'

import type { ReceivedBidsPanelProps } from './types'

/**
 * The pending bids other clubs placed for a player of the acting club: a strip that switches
 * between the transfer bids and the loan bids, each listed newest first with the bidding club, the
 * season, the day, the manager and what is offered, and under each the buttons that accept or
 * reject it.
 *
 * - Answering only records the answer. The player stays at the club, so the panel stays open and
 *   the bids are read again.
 * - How an answer went is put into words in a toast.
 *
 * @param props The acting club and the player.
 * @returns The rendered strip and lists. While the bids load, or when they could not be read, a
 * message shows in a live region instead, and so does the line for a kind with no bid.
 */
export function ReceivedBidsPanel({ leagueTeamId, playerId }: ReceivedBidsPanelProps) {
  const { tabs, message, answerButtonsFor } = useReceivedBidsPanel(leagueTeamId, playerId)

  return (
    <div>
      {tabs.length > 0 && (
        <Tabs
          label={BID_TYPE_TABS_LABEL}
          variant="segmented"
          tabs={tabs.map((tab) => ({
            id: tab.id,
            label: tab.label,
            panel: (
              <div>
                {tab.items.length > 0 && (
                  <HistoryList
                    items={tab.items}
                    renderActions={(key) => {
                      const answerButtons = answerButtonsFor(key)

                      return answerButtons === null ? null : <AnswerButtons {...answerButtons} />
                    }}
                  />
                )}

                <div role="status">
                  {tab.emptyMessage !== null && <p className="label">{tab.emptyMessage}</p>}
                </div>
              </div>
            ),
          }))}
        />
      )}

      <div role="status">{message !== null && <p className="label">{message}</p>}</div>
    </div>
  )
}
