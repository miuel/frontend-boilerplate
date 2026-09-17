import { ZAppApiConfig, zAppApiConfig } from './config'

type QueryParams = Record<string, string | number | boolean | undefined>

export class ZAppClient {
  private config: ZAppApiConfig

  constructor(config: ZAppApiConfig) {
    this.config = config
  }

  async fetch<T = unknown>(
    path: string,
    params: QueryParams = {},
    init?: RequestInit
  ): Promise<T> {
    const url = new URL(`${this.config.baseUrl}${path}`)

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.set(key, String(value))
      }
    })

    const response = await fetch(url.toString(), {
      ...init,
      headers: { 'X-API-TOKEN': this.config.apiToken, ...init?.headers },
    })

    if (!response.ok) {
      throw new Error(`z-app API error: ${response.status} ${response.statusText}`)
    }

    return response.json() as Promise<T>
  }
}

export const zAppClient = new ZAppClient(zAppApiConfig)
