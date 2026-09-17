import z from 'zod'

const BriqpayConfigSchema = z.object({
  username: z.string(),
  secret: z.string(),
  environment: z.enum(['playground', 'production']),
  variantId: z.string(),
})

export type BriqpayConfig = z.infer<typeof BriqpayConfigSchema>

export const briqpayConfig = BriqpayConfigSchema.parse({
  username: process.env.BRIQPAY_USERNAME,
  secret: process.env.BRIQPAY_SECRET,
  environment: process.env.BRIQPAY_ENVIRONMENT,
  variantId: process.env.BRIQPAY_VARIANT,
})
