import { z } from 'zod'

const configSchema = z.object({
  baseUrl: z.string().url(),
  authToken: z.string().min(1),
  tenantId: z.string().min(1),
})

export type ZConnectConfig = z.infer<typeof configSchema>

export const zConnectConfig = configSchema.parse({
  baseUrl: process.env.Z_CONNECT_URL,
  authToken: process.env.Z_CONNECT_STOCK_UPDATE_TOKEN,
  tenantId: process.env.CRYSTALLIZE_TENANT_ID,
})
