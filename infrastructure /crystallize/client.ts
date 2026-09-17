import { CrystallizeClient } from 'crystallize-utils'
import z from 'zod'

export const crystallizeConfig = z
  .object({
    tenantId: z.string(),
    tenantIdentifier: z.string(),
    staticAuthToken: z.string(),
    accessTokenId: z.string(),
    accessTokenSecret: z.string(),
  })
  .parse({
    tenantId: process.env.CRYSTALLIZE_TENANT_ID,
    tenantIdentifier: process.env.CRYSTALLIZE_TENANT,
    staticAuthToken: process.env.CRYSTALLIZE_AUTH_TOKEN,
    accessTokenId: process.env.CRYSTALLIZE_ACCESS_TOKEN_ID,
    accessTokenSecret: process.env.CRYSTALLIZE_ACCESS_TOKEN_SECRET,
  })

export const crystallizeClient = new CrystallizeClient(crystallizeConfig)
