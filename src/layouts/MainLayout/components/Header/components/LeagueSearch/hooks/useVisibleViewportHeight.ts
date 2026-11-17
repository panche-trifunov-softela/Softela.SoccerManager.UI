import { useEffect } from 'react'

import { VIEWPORT_HEIGHT_PROPERTY } from '../constants'

import type { RefObject } from 'react'

/**
 * Writes the height of the visible viewport onto an element as a custom property, while it is
 * active, so the CSS can keep the element above a phone's on-screen keyboard.
 *
 * - The property is written when the hook becomes active and each time the visible viewport
 *   resizes, and removed when it stops being active.
 * - Where the browser has no visual viewport, nothing is written and the CSS falls back.
 *
 * @param targetRef The element that takes the property.
 * @param isActive Whether the height is wanted; no listener is held while it is false.
 * @returns Nothing.
 */
export function useVisibleViewportHeight(
  targetRef: RefObject<HTMLElement | null>,
  isActive: boolean,
): void {
  useEffect(() => {
    const target = targetRef.current
    const viewport = window.visualViewport

    if (!isActive || target === null || viewport === null) return

    const writeHeight = () => {
      target.style.setProperty(VIEWPORT_HEIGHT_PROPERTY, `${viewport.height}px`)
    }

    writeHeight()

    viewport.addEventListener('resize', writeHeight)

    return () => {
      viewport.removeEventListener('resize', writeHeight)
      target.style.removeProperty(VIEWPORT_HEIGHT_PROPERTY)
    }
  }, [targetRef, isActive])
}
