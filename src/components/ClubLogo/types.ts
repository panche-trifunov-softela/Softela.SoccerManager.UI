/** How big a crest is drawn. */
export type ClubLogoSize = 'md' | 'lg'

/** What `ClubLogo` is handed. */
export interface ClubLogoProps {
  /** The address of the club's logo, or `null` when it has none. */
  logoUrl: string | null

  /** The crest's size: `md` is the 40px crest of a table row, `lg` the 80px one of a card header. */
  size: ClubLogoSize
}
