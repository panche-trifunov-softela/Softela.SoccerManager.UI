/**
 * The body an update or delete endpoint returns, such as `DELETE
 * /api/manager-player-rating-votes/{id}`: whether the change was made.
 */
export interface SuccessResultDto {
  /** Whether the change was made; a failure comes back as an error status instead. */
  success: boolean
}
