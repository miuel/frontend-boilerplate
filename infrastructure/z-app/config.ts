import { z } from 'zod'

const configSchema = z.object({
  baseUrl: z.string().url(),
  apiToken: z.string().min(1),
})

export type ZAppApiConfig = z.infer<typeof configSchema>

export const zAppApiConfig = configSchema.parse({
  baseUrl: process.env.Z_APP_API_URL,
  apiToken: process.env.Z_APP_API_TOKEN,
})
