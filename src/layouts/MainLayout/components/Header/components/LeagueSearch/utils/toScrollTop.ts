/**
 * Works out where a scrolling area must scroll to so that a stretch of its content is fully in
 * view, moving it as little as possible.
 *
 * @param scrollTop The area's current scroll offset.
 * @param viewHeight The height of the area's visible part.
 * @param top Where the stretch starts, measured from the top of the area's content.
 * @param bottom Where the stretch ends, measured from the top of the area's content.
 * @returns The scroll offset to use. When the stretch is taller than the view, its top wins.
 */
export function toScrollTop(
  scrollTop: number,
  viewHeight: number,
  top: number,
  bottom: number,
): number {
  let next = scrollTop

  if (bottom > next + viewHeight) next = bottom - viewHeight

  if (top < next) next = top

  return next
}
