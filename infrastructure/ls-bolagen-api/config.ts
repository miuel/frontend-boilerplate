import { z } from 'zod'

export const BASE_URL = 'https://lsadmin.lsbolagen.se/api'

const configSchema = z.object({
  siteId: z.string().default('999'),
  syncKey: z.string(),
})

export type LsBolagenApiConfig = z.infer<typeof configSchema>

export const lsBolagenApiConfig = configSchema.parse({
  siteId: process.env.LS_BOLAGEN_SITE_ID,
  syncKey: process.env.LS_BOLAGEN_SYNC_KEY,
})
