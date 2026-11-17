import { useEffect } from 'react'

import { toScrollTop } from '../utils'

import type { RefObject } from 'react'

/**
 * Scrolls the results' scrolling area, and nothing else, so the active option is fully in view.
 *
 * - Only the area's own `scrollTop` changes, so the page never scrolls with it.
 * - For the first option of a group the group's heading is brought into view too.
 * - Nothing happens while no option is active.
 *
 * @param scrollRef The scrolling area that holds the options.
 * @param activeId The element id of the active option, or `null` when none is.
 * @param headingId The element id of the heading to keep in view with the active option, or
 * `null` when the active option is not the first of its group.
 * @returns Nothing.
 */
export function useKeepActiveVisible(
  scrollRef: RefObject<HTMLElement | null>,
  activeId: string | null,
  headingId: string | null,
): void {
  useEffect(() => {
    const area = scrollRef.current
    const option = activeId === null ? null : document.getElementById(activeId)

    if (area === null || option === null) return

    const heading = headingId === null ? null : document.getElementById(headingId)
    const origin = area.getBoundingClientRect().top - area.scrollTop

    const top = (heading ?? option).getBoundingClientRect().top - origin
    const bottom = option.getBoundingClientRect().bottom - origin

    area.scrollTop = toScrollTop(area.scrollTop, area.clientHeight, top, bottom)
  }, [scrollRef, activeId, headingId])
}
