import { FREE_AGENT_LABEL } from '@/constants/freeAgent'

import type { PlayerHeaderProps } from '../types'

/**
 * Puts "Free agent" where a header's club would be, with no crest.
 *
 * @param header The player's header, as written from the record.
 * @returns A copy of the header whose club is the free-agent label.
 */
export function toFreeAgentHeader(header: PlayerHeaderProps): PlayerHeaderProps {
  return { ...header, clubName: FREE_AGENT_LABEL, clubLogoUrl: null }
}
