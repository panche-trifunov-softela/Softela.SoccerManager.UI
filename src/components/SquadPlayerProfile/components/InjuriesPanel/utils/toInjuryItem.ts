import { toInjuryDates } from './toInjuryDates'

import type { HistoryItem } from '@/components/HistoryList'
import type { PlayerInjuryDto } from '@/types/playerInjuryDto'

/**
 * Turns one injury into a row of the history list.
 *
 * @param injury The injury as the API returns it.
 * @returns The row: the injury's name as the title and its dates under it. The row has no crest.
 */
export function toInjuryItem(injury: PlayerInjuryDto): HistoryItem {
  return {
    key: String(injury.id),
    hasCrest: false,
    title: injury.name,
    meta: toInjuryDates(injury.injuryStartDate, injury.injuryEndDate),
    detail: null,
    value: null,
    note: null,
  }
}
