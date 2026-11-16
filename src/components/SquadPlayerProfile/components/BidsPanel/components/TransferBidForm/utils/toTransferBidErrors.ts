import { BUYBACK_TOGETHER_MESSAGE, TRANSFER_FEE_REQUIRED_MESSAGE } from '../constants'

import type { TransferBidDraft, TransferBidErrors } from '../types'

/**
 * Checks a transfer bid form.
 *
 * - The transfer fee is required.
 * - The buyback value and its period are set together or not at all, and the one that is empty
 *   gets the error.
 *
 * @param draft What the reader has typed.
 * @returns Why each field is not valid, with `null` for each that is.
 */
export function toTransferBidErrors(draft: TransferBidDraft): TransferBidErrors {
  const hasValue = draft.buybackValue !== ''

  const hasPeriod = draft.buybackSeasons !== ''

  return {
    fee: draft.fee === '' ? TRANSFER_FEE_REQUIRED_MESSAGE : null,
    buybackValue: hasPeriod && !hasValue ? BUYBACK_TOGETHER_MESSAGE : null,
    buybackPeriod: hasValue && !hasPeriod ? BUYBACK_TOGETHER_MESSAGE : null,
  }
}
