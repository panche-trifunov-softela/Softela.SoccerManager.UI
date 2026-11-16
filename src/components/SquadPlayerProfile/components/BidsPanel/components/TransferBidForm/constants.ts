import { toSeasonOptions } from '@/components/SquadPlayerProfile/components/BidsPanel/utils'

import type { BidSelectOption } from '@/components/SquadPlayerProfile/components/BidsPanel/types'

import type { TransferBidErrors } from './types'

/** The label of the transfer fee field. */
export const TRANSFER_FEE_LABEL = 'Transfer fee'

/** The label of the first swap player field. */
export const FIRST_SWAP_LABEL = 'Swap player 1'

/** The label of the second swap player field. */
export const SECOND_SWAP_LABEL = 'Swap player 2'

/** The label of the buyback value field. */
export const BUYBACK_VALUE_LABEL = 'Buyback value'

/** The label of the buyback period field. */
export const BUYBACK_PERIOD_LABEL = 'Buyback period'

/** The words on the submit button. */
export const PLACE_TRANSFER_BID_LABEL = 'Place transfer bid'

/** The choice of no swap player, shown by each swap player field. */
export const NO_SWAP_OPTION = 'No swap player'

/** The only choice a swap player field offers while the bidding club's squad is being read. */
export const LOADING_SQUAD_OPTION = 'Loading your squad…'

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

/** What the toast says when the bidding club's squad could not be read. */
export const SWAP_SQUAD_FAILED_MESSAGE = 'Your squad could not be loaded.'

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
