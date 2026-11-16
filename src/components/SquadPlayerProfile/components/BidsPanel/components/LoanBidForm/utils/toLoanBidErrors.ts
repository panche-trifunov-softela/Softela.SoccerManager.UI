import { LOAN_FEE_REQUIRED_MESSAGE } from '../constants'

import type { LoanBidDraft, LoanBidErrors } from '../types'

/**
 * Checks a loan bid form.
 *
 * @param draft What the reader has typed; only the loan fee is required.
 * @returns Why each field is not valid, with `null` for each that is.
 */
export function toLoanBidErrors(draft: LoanBidDraft): LoanBidErrors {
  return {
    fee: draft.fee === '' ? LOAN_FEE_REQUIRED_MESSAGE : null,
  }
}
