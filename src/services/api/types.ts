/** The HTTP methods the API exposes. */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

/** Options for one API request. */
export interface RequestOptions {
  /** The method to send; `GET` when omitted. */
  method?: HttpMethod

  /** Value sent as the JSON body. Omitted for a request that carries none. */
  body?: unknown

  /** Aborts the request, normally from the calling hook's cleanup. */
  signal?: AbortSignal
}
