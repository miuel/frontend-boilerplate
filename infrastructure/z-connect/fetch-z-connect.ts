import type { ZConnectConfig } from './config'

export const Z_CONNECT_ROUTES = {
  stockUpdate: { path: '/storefront/stock-update', method: 'POST' },
} as const satisfies Record<
  string,
  { path: string; method: 'GET' | 'POST' | 'PUT' | 'DELETE' }
>

export type ZConnectRoute = keyof typeof Z_CONNECT_ROUTES

type FetchZConnectOptions = {
  config: ZConnectConfig
  route: ZConnectRoute
  body?: unknown
}

export async function fetchZConnect<T = unknown>(opts: FetchZConnectOptions): Promise<T> {
  const { config, route, body } = opts
  const { path, method } = Z_CONNECT_ROUTES[route]

  const response = await fetch(`${config.baseUrl}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': config.authToken,
      tenant: config.tenantId,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    const errorBody = await response.text().catch(() => '')
    throw new Error(
      `z-connect ${route} failed: ${response.status} ${response.statusText} ${errorBody}`
    )
  }

  if (response.status === 204) return undefined as T
  const text = await response.text()
  return text ? (JSON.parse(text) as T) : (undefined as T)
}
