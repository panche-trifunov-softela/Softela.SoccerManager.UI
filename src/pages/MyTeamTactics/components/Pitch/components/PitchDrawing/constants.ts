/** The width of the pitch, touchline to touchline, in metres. */
export const PITCH_WIDTH = 68

/** The length of the pitch, goal line to goal line, in metres. */
export const PITCH_LENGTH = 105

/** The grass beyond each touchline, in metres. */
export const RUN_OFF_SIDE = 6

/** The grass beyond each goal line, in metres. */
export const RUN_OFF_END = 7

/** The length of one mowing band, in metres. */
export const BAND_LENGTH = 7

/** The radius of the centre circle and of the penalty arcs, in metres. */
export const CIRCLE_RADIUS = 9.15

/** The width of the penalty area, in metres. */
export const PENALTY_AREA_WIDTH = 40.32

/** The depth of the penalty area from its goal line, in metres. */
export const PENALTY_AREA_DEPTH = 16.5

/** The width of the goal area, in metres. */
export const GOAL_AREA_WIDTH = 18.32

/** The depth of the goal area from its goal line, in metres. */
export const GOAL_AREA_DEPTH = 5.5

/** How far the penalty spot is from its goal line, in metres. */
export const PENALTY_SPOT_DISTANCE = 11

/** The radius of a spot, in metres. */
export const SPOT_RADIUS = 0.3

/** The radius of a corner arc, in metres. */
export const CORNER_ARC_RADIUS = 1

/** The width of a goal between its posts, in metres. */
export const GOAL_WIDTH = 7.32

/** How high the crossbar is drawn above the goal line, in percent of the board's height. */
export const GOAL_HEIGHT = 2

/** How high the net rises above the crossbar, in percent of the board's height. */
export const NET_RISE = 1.2

/** How far the top of the net narrows on each side, as a share of the goal's width on the board. */
export const NET_TOP_INSET = 0.04

/** The number of columns of the net's mesh. */
export const NET_COLUMNS = 8

/** The number of rows of the net's mesh. */
export const NET_ROWS = 5

/** The number of straight segments that draw the centre circle. */
export const CIRCLE_SEGMENTS = 72

/** The number of straight segments that draw a penalty arc. */
export const ARC_SEGMENTS = 28

/** The number of straight segments that draw a corner arc. */
export const CORNER_SEGMENTS = 6

/** The number of straight segments that draw a spot. */
export const SPOT_SEGMENTS = 12

/** Where the fade into the page starts, in percent of the board's height. */
export const NEAR_FADE_TOP = 88

/** The ids of the drawing's gradients, which its shapes refer to. */
export const GRADIENT_IDS = {
  sun: 'pitch-sun',
  shade: 'pitch-shade',
  haze: 'pitch-haze',
  nearFade: 'pitch-near-fade',
} as const
