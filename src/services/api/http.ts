import { appConfig } from '@/config'
import { ensureFreshToken } from '@/services/auth'

import { ApiError } from './apiError'
import { readBody, toProblemDetails } from './utils'

import type { RequestOptions } from './types'

/**
 * Sends one request to the API and returns its body.
 *
 * The bearer token is renewed first whenever it is close to expiry, so a
 * request never carries one that is about to lapse.
 *
 * An error status becomes an `ApiError`. A network failure and an abort reject
 * with `fetch`'s own error instead, so a caller that aborted can tell the two
 * apart.
 *
 * @param path Path starting with `/`, appended to the configured base URL.
 * @param options The method, body and abort signal; every one optional.
 * @returns The response body, typed as the caller declares it.
 * @throws {ApiError} When the API answers with an error status.
 */
export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, signal } = options

  const token = await ensureFreshToken()

  const headers = new Headers({ Authorization: `Bearer ${token}` })
  if (body !== undefined) headers.set('Content-Type', 'application/json')

  const response = await fetch(`${appConfig.api.baseUrl}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
    signal,
  })

  if (!response.ok) throw new ApiError(response.status, await toProblemDetails(response))

  // The one cast at the trust boundary: the caller declares the shape its
  // endpoint returns, mirrored from the backend, and nothing here can check it.
  return (await readBody(response)) as T
}
