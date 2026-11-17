import type { LeagueSearchGroupView } from '../types'

/**
 * Finds the heading of the group an option opens.
 *
 * @param groups The groups the popup lists.
 * @param optionId The element id of the option.
 * @returns The element id of the group's heading when the option is the first of its group, or
 * `null` when it is not, or when there is no option.
 */
export function toGroupHeadingId(
  groups: readonly LeagueSearchGroupView[],
  optionId: string | null,
): string | null {
  if (optionId === null) return null

  return groups.find((group) => group.options[0]?.id === optionId)?.headingId ?? null
}
