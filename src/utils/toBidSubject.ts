import { FREE_TRANSFER_TEXT } from '@/constants/bidText'
import { formatEuros } from '@/utils/formatEuros'

import type { AnswerableBid } from '@/types/answerableBid'

/**
 * Names a bid by who placed it, what it offers, its kind and, when a list shows several players'
 * bids, the player it is for, for the answer buttons' accessible names.
 *
 * @param bid The bid, with its kind.
 * @returns The phrase naming it, such as `Bayer Leverkusen's €18M transfer bid`, or
 * `Bayer Leverkusen's free loan bid` when the fee is zero; with ` for <player>` added when the
 * bid carries the player's name.
 */
export function toBidSubject(bid: AnswerableBid): string {
  const feeText = bid.fee === 0 ? FREE_TRANSFER_TEXT.toLowerCase() : formatEuros(bid.fee)

  const subject = `${bid.teamName}'s ${feeText} ${bid.kind} bid`

  return bid.playerName === null ? subject : `${subject} for ${bid.playerName}`
}
