import { Meilisearch } from 'meilisearch'
import { z } from 'zod'

const meiliConfigSchema = z.object({
  host: z.string(),
  apiKey: z.string(),
})

const meiliConfig = meiliConfigSchema.parse({
  host: process.env.MEILI_HOST,
  apiKey: process.env.MEILI_API_KEY,
})

export const meiliClient = new Meilisearch(meiliConfig)
