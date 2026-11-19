import type { AnswerButtonsProps } from '@/components/AnswerButtons'
import type { HistoryItem } from '@/components/HistoryList'
import type { AnswerableBid } from '@/types/answerableBid'
import type { BidKind } from '@/types/bidKind'
import type { TransferStatus } from '@/types/transferStatus'

/** What `ClubBids` is handed. */
export interface ClubBidsProps {
  /** Which kind of bid the page lists. */
  kind: BidKind
}

/** One bid of the page as a list row, with what a click on it and its actions need. */
export interface ClubBidRow {
  /** The row as the list draws it, every text already written. */
  item: HistoryItem

  /** The player the bid is for. */
  playerId: number

  /** The name of the player the bid is for. */
  playerName: string

  /** Where the bid stands. */
  status: TransferStatus

  /** The bid as the club can answer it, or `null` when it is not a pending bid the club received. */
  answerable: AnswerableBid | null
}

/** A club's bids of one kind as rows, pending first and then completed. */
export interface ClubBidRows {
  /** The bids nobody has answered yet, newest first. */
  pending: ClubBidRow[]

  /** The bids whose deal is agreed or carried out, newest first. */
  completed: ClubBidRow[]
}

/** One titled section of the page: a heading over its rows, or over the line saying it has none. */
export interface ClubBidsSection {
  /** Which section it is. */
  id: 'pending' | 'completed'

  /** The section's heading. */
  heading: string

  /** The rows to list, newest first; empty when there is no bid. */
  items: HistoryItem[]

  /** What shows when there is no bid, or `null` when there is at least one. */
  emptyMessage: string | null
}

/** What a row has at its end: answer buttons, the state of its deal, or nothing. */
export type ClubBidActions =
  | {
      /** The bid is one the club can answer. */
      kind: 'answer'

      /** The props of its answer buttons. */
      props: AnswerButtonsProps
    }
  | {
      /** The bid's deal is agreed or carried out. */
      kind: 'status'

      /** The bid's status as the API sent it, which picks the tag's look. */
      status: TransferStatus

      /** The words on the tag. */
      label: string
    }
  | null

/** The sentences one kind's page says. */
export interface ClubBidsTexts {
  /** The page's heading. */
  title: string

  /** What shows while the bids load. */
  loading: string

  /** What shows, and is toasted when no better reason is known, when the bids could not be read. */
  failed: string

  /** What shows under the pending heading when there is no pending bid. */
  noPending: string

  /** What shows under the completed heading when there is no completed bid. */
  noCompleted: string
}

/** What `useClubBids` exposes to the view. */
export interface ClubBidsState {
  /** The page's heading. */
  title: string

  /** The club's name and game world, or `null` until the address's club is one the user runs. */
  subtitle: string | null

  /** What shows instead of, or above, the sections: that the bids load or why they could not be read. */
  message: string | null

  /** The sections, pending then completed, or none while the bids are not there to show. */
  sections: ClubBidsSection[]

  /**
   * What the row with the given key has at its end.
   *
   * @param key The row's key.
   */
  actionsFor: (key: string) => ClubBidActions

  /**
   * Opens the profile of the player the row with the given key is for.
   *
   * @param key The row's key.
   */
  openPlayer: (key: string) => void
}

/** One finished read of a club's bids, kept with the club and the kind it was made for. */
export interface ClubBidsSettledRead {
  /** The league team the read was made for. */
  leagueTeamId: number

  /** The kind of bid the read was made for. */
  kind: BidKind

  /** What was read, or `null` when the read failed. */
  rows: ClubBidRows | null

  /** The sentence to show when the read failed, or `null` when it did not. */
  message: string | null
}

/** What `useClubBidsRead` exposes. */
export interface ClubBidsReadState {
  /** What was read, or `null` while it loads, when the read failed or when there is no club. */
  rows: ClubBidRows | null

  /** What shows: that the bids load or why they could not be read, else `null`. */
  message: string | null

  /** Reads the bids again, keeping what was read on screen until the new read settles. */
  reload: () => void
}
