import {
  faChartLine,
  faHandHoldingDollar,
  faKitMedical,
  faRightLeft,
} from '@fortawesome/free-solid-svg-icons'

/** What shows while the profile is being read. */
export const PROFILE_LOADING_MESSAGE = 'Loading the player…'

/** What shows, and is toasted when no better reason is known, when the profile could not be read. */
export const PROFILE_LOAD_FAILED_MESSAGE = 'The player could not be loaded.'

/** The accessible name of the tab strip under the status section. */
export const PROFILE_TABS_LABEL = 'Player details'

/** The id of the transfer history tab. */
export const TRANSFERS_TAB_ID = 'transfers'

/** The label of the transfer history tab. */
export const TRANSFERS_TAB_LABEL = 'Transfer history'

/** The icon of the transfer history tab. */
export const TRANSFERS_TAB_ICON = faRightLeft

/** The id of the injury history tab. */
export const INJURIES_TAB_ID = 'injuries'

/** The label of the injury history tab. */
export const INJURIES_TAB_LABEL = 'Injury history'

/** The icon of the injury history tab. */
export const INJURIES_TAB_ICON = faKitMedical

/** The id of the rating history tab. */
export const RATINGS_TAB_ID = 'ratings'

/** The label of the rating history tab. */
export const RATINGS_TAB_LABEL = 'Rating history'

/** The icon of the rating history tab. */
export const RATINGS_TAB_ICON = faChartLine

/** The id of the bids tab. */
export const BIDS_TAB_ID = 'bids'

/** The label of the bids tab. */
export const BIDS_TAB_LABEL = 'Bids'

/** The icon of the bids tab. */
export const BIDS_TAB_ICON = faHandHoldingDollar

/** The accessible name of the strip that switches between the transfer and the loan kind of bid. */
export const BID_TYPE_TABS_LABEL = 'Bid type'

/** The id of the transfer sub-tab of the bids tab. */
export const TRANSFER_BID_TAB_ID = 'transfer'

/** The label of the transfer sub-tab of the bids tab. */
export const TRANSFER_BID_TAB_LABEL = 'Transfer'

/** The id of the loan sub-tab of the bids tab. */
export const LOAN_BID_TAB_ID = 'loan'

/** The label of the loan sub-tab of the bids tab. */
export const LOAN_BID_TAB_LABEL = 'Loan'
