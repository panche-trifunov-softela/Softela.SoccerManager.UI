/**
 * Accent colours a card's bottom border is drawn in, as custom properties from
 * the template palette. The template colours a repeated card by setting its
 * border colour per item, never by filling the card.
 *
 * A league is always drawn in the same colour, because the backend's league
 * record carries none of its own.
 */
export const LEAGUE_ACCENTS: readonly string[] = [
  'var(--azure)',
  'var(--grass)',
  'var(--accent)',
  'var(--purple)',
  'var(--salmon)',
  'var(--turquoise)',
]
