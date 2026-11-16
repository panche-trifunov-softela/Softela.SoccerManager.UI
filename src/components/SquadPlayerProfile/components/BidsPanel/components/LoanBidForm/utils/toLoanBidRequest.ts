import type { PlaceLoanBidRequest } from '@/types/placeLoanBidRequest'

import type { LoanBidDraft } from '../types'

/**
 * Writes a valid loan bid form as the request that places it.
 *
 * @param draft What the reader has typed, already checked.
 * @returns The fee, the length, and the buy option, `null` when there is none.
 */
export function toLoanBidRequest(draft: LoanBidDraft): PlaceLoanBidRequest {
  return {
    loanFee: Number(draft.fee),
    seasonsLength: Number(draft.seasons),
    buyOptionValue: draft.buyOption === '' ? null : Number(draft.buyOption),
  }
}
