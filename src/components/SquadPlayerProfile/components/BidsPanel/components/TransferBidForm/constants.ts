import { toSeasonOptions } from '@/components/SquadPlayerProfile/components/BidsPanel/utils'

import type { BidSelectOption } from '@/components/SquadPlayerProfile/components/BidsPanel/types'

import type { TransferBidErrors } from './types'

/** The label of the transfer fee field. */
export const TRANSFER_FEE_LABEL = 'Transfer fee'

/** The most players of the bidding club a bid can offer in swap; the API refuses more. */
export const MAX_SWAP_PLAYERS = 2

/** The label of the buyback value field. */
export const BUYBACK_VALUE_LABEL = 'Buyback value'

/** The label of the buyback period field. */
export const BUYBACK_PERIOD_LABEL = 'Buyback period'

/** The words on the submit button. */
export const PLACE_TRANSFER_BID_LABEL = 'Place transfer bid'

/** The words on the button that adds a swap player row. */
export const ADD_SWAP_LABEL = 'Add swap player'

/** The choice a swap player row starts on, which cannot be chosen again once left. */
export const SWAP_PLACEHOLDER_OPTION = 'Choose a player'

/** The buyback period that stands for no buyback. */
export const NO_BUYBACK_OPTION = 'No buyback'

/** The numbers of seasons a buyback can stay valid for. */
export const BUYBACK_SEASONS = [1, 2] as const

/** The choices of the buyback period, in order: no buyback, then each number of seasons. */
export const BUYBACK_PERIOD_OPTIONS: BidSelectOption[] = [
  { value: '', label: NO_BUYBACK_OPTION },
  ...toSeasonOptions(BUYBACK_SEASONS),
]

/** What shows under the transfer fee when it is missing. */
export const TRANSFER_FEE_REQUIRED_MESSAGE = 'Enter the transfer fee.'

/** What shows under whichever of the buyback value and period is empty while the other is set. */
export const BUYBACK_TOGETHER_MESSAGE = 'Set the buyback value and its period together, or neither.'

/** What shows under a swap player row that has no player chosen when the bid is sent. */
export const SWAP_REQUIRED_MESSAGE = 'Choose a player, or remove this row.'

/** What shows under the add button while the bidding club's squad is being read. */
export const LOADING_SQUAD_MESSAGE = 'Loading your squad…'

/** What the toast says, and what shows under the add button, when the squad could not be read. */
export const SWAP_SQUAD_FAILED_MESSAGE = 'Your squad could not be loaded.'

/** What shows under the add button when the bidding club's squad has no player to offer. */
export const NO_SWAP_PLAYERS_MESSAGE = 'Your squad has no players to offer.'

/** What the toast says, after the player's name, when a transfer bid went through. */
export const TRANSFER_BID_SENT_MESSAGE = 'Transfer bid sent.'

/** What the toast says, after the player's name, when a transfer bid got no answer from the API. */
export const TRANSFER_BID_FAILED_MESSAGE = 'The transfer bid could not be sent.'

/** The errors of a form nobody has tried to submit, or whose last attempt was valid. */
export const NO_TRANSFER_BID_ERRORS: TransferBidErrors = {
  fee: null,
  buybackValue: null,
  buybackPeriod: null,
}
