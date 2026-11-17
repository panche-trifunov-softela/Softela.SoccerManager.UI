import type { PlaceTransferBidRequest } from '@/types/placeTransferBidRequest'

import type { TransferBidDraft } from '../types'

/**
 * Writes a valid transfer bid form as the request that places it.
 *
 * @param draft What the reader has typed, already checked.
 * @returns The fee, the buyback value and period, each `null` when no buyback is set, and the
 * squad row ids of the swap players chosen, in row order.
 */
export function toTransferBidRequest(draft: TransferBidDraft): PlaceTransferBidRequest {
  return {
    transferFee: Number(draft.fee),
    buybackValue: draft.buybackValue === '' ? null : Number(draft.buybackValue),
    buybackValidSeasons: draft.buybackSeasons === '' ? null : Number(draft.buybackSeasons),
    swapLeagueTeamPlayerIds: draft.swaps.filter((id) => id !== '').map(Number),
  }
}
