/**
 * What `GET /api/players/search` can sort its players by. `age` sorts by age,
 * so ascending is the youngest first.
 */
export type PlayerSortBy = 'name' | 'rating' | 'age' | 'value' | 'wage'
