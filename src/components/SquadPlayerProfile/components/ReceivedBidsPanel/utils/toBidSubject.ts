import { FREE_TRANSFER_TEXT } from '@/components/SquadPlayerProfile/constants'
import { formatEuros } from '@/utils/formatEuros'

import type { ReceivedBid } from '../types'

/**
 * Names a bid by who placed it, what it offers and its kind, for the answer buttons' accessible
 * names.
 *
 * @param received The bid, with its kind.
 * @returns The phrase naming it, such as `Bayer Leverkusen's €18M transfer bid`, or
 * `Bayer Leverkusen's free loan bid` when the fee is zero.
 */
export function toBidSubject(received: ReceivedBid): string {
  const fee = received.kind === 'transfer' ? received.bid.transferFee : received.bid.loanFee

  const feeText = fee === 0 ? FREE_TRANSFER_TEXT.toLowerCase() : formatEuros(fee)

  return `${received.bid.teamName}'s ${feeText} ${received.kind} bid`
}
