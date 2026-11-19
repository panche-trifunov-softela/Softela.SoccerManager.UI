import { ACCEPTED_BID_LABEL } from '@/constants/bidText'

import type { BidKind } from '@/types/bidKind'
import type { TransferStatus } from '@/types/transferStatus'

import type { ClubBidsTexts } from './types'

/** The sentences of each kind's page. */
export const CLUB_BIDS_TEXTS: Readonly<Record<BidKind, ClubBidsTexts>> = {
  transfer: {
    title: 'Transfers',
    loading: 'Loading the transfer bids…',
    failed: 'The transfer bids could not be loaded.',
    noPending: 'No pending transfer bids.',
    noCompleted: 'No completed transfer bids.',
  },
  loan: {
    title: 'Loans',
    loading: 'Loading the loan bids…',
    failed: 'The loan bids could not be loaded.',
    noPending: 'No pending loan bids.',
    noCompleted: 'No completed loan bids.',
  },
}

/** The heading over the bids nobody has answered yet. */
export const PENDING_HEADING = 'Pending'

/** The heading over the bids whose deal is agreed or carried out. */
export const COMPLETED_HEADING = 'Completed'

/** What a row's line says of a bid the club received. */
export const RECEIVED_LABEL = 'Received'

/** What a row's line says of a bid the club placed. */
export const PLACED_LABEL = 'Placed'

/** What a row says, at its end, of a bid whose deal was carried out. */
export const COMPLETED_BID_LABEL = 'Completed'

/** What a row says, at its end, of a bid in each status, or `null` when it says nothing. */
export const COMPLETED_BID_LABELS: Readonly<Record<TransferStatus, string | null>> = {
  1: null,
  2: ACCEPTED_BID_LABEL,
  3: null,
  4: COMPLETED_BID_LABEL,
}

/** What the back arrow announces. */
export const BACK_TO_MY_TEAMS_LABEL = 'Back to my teams'
