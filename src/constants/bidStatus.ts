import type { TransferStatus } from '@/types/transferStatus'

/** The status of a bid nobody has answered yet. */
export const PENDING_BID_STATUS: TransferStatus = 1

/** The status of a bid its holder accepted, whose deal is agreed but not completed yet. */
export const ACCEPTED_BID_STATUS: TransferStatus = 2
