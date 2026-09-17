import type { InventoryType, StockMeta } from '@/domains/stock/utils/classify-stock'
import { zConnectConfig, type ZConnectConfig } from './config'
import { fetchZConnect } from './fetch-z-connect'

export type StockUpdatePayload = {
  sku: string
  type: InventoryType
  quantity: number
  stockLocation: string
  meta: StockMeta
}

type CreateClientOptions = {
  config?: ZConnectConfig
}

export function createZConnectClient(opts: CreateClientOptions = {}) {
  const config = opts.config ?? zConnectConfig

  return {
    /**
     * Push a stock update for a SKU to the storefront.
     */
    async stockUpdate(input: StockUpdatePayload): Promise<void> {
      await fetchZConnect({
        config,
        route: 'stockUpdate',
        body: input,
      })
    },
  }
}

export type ZConnectClient = ReturnType<typeof createZConnectClient>

export const zConnectClient = createZConnectClient()
