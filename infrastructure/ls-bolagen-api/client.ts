import { BASE_URL, LsBolagenApiConfig, lsBolagenApiConfig } from './config'

type QueryParams = Record<string, string | number | boolean | undefined>

const ENDPOINTS = {
  'article-export': 'zarticleexport',
  'order-create': 'zordercreate',
  'order-export': 'zorderexport',
} as const

type Endpoint = keyof typeof ENDPOINTS

export interface FetchOptions {
  params?: QueryParams
  body?: unknown
  method?: 'GET' | 'POST'
  siteId?: string
}

export class LsBolagenClient {
  private config: LsBolagenApiConfig

  constructor(config: LsBolagenApiConfig) {
    this.config = config
  }

  async fetch<T = unknown>(endpoint: Endpoint, options: FetchOptions = {}): Promise<T> {
    const { params = {}, body, siteId } = options
    const method = options.method ?? (body !== undefined ? 'POST' : 'GET')
    const apiEndpoint = ENDPOINTS[endpoint]
    const url = new URL(`${BASE_URL}/${apiEndpoint}`)

    url.searchParams.set('site_id', siteId ?? this.config.siteId)
    url.searchParams.set('z_sync_key', this.config.syncKey)

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.set(key, String(value))
      }
    })

    const init: RequestInit = { method }
    if (body !== undefined) {
      init.headers = { 'Content-Type': 'application/json' }
      init.body = JSON.stringify(body)
    }

    const response = await fetch(url.toString(), init)

    if (!response.ok) {
      const text = await response.text().catch(() => '<no body>')
      throw new Error(
        `LS Bolagen API error: ${response.status} ${response.statusText} — ${text.slice(0, 500)}`
      )
    }

    const contentType = response.headers.get('content-type') ?? ''
    if (!contentType.includes('application/json')) {
      const text = await response.text().catch(() => '<no body>')
      throw new Error(
        `LS Bolagen API: expected JSON but got "${contentType}". URL: ${apiEndpoint}?site_id=${siteId ?? this.config.siteId}. Body preview: ${text.slice(0, 500)}`
      )
    }

    return response.json() as Promise<T>
  }
}

export const lsBolagenClient = new LsBolagenClient(lsBolagenApiConfig)
