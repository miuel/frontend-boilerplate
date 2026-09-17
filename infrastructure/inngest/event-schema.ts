import { EventSchemas } from 'inngest'
import { z } from 'zod'

const syncProductsSchema = z.object({
  includeStockCount: z.boolean().optional(),
  affectedAfter: z.string().optional(),
  articleIds: z.array(z.string()).optional(),
  restrictToNewProducts: z.boolean().optional(),
})

const stockClassificationSchema = z.object({
  type: z.enum(['stock', 'backorder', 'order_item', 'not_available']),
  quantity: z.number().int().nonnegative(),
  meta: z.object({
    etaDate: z.string().optional(),
    deliveryLength: z.number().int().nonnegative().optional(),
    deliveryUnit: z.enum(['days', 'weeks']).optional(),
  }),
})

const productDtoSchema = z.object({
  sku: z.string(),
  priceVariants: z.record(z.string(), z.string()),
  productType: z.string(),
  productBrand: z.string(),
  description: z.record(z.string(), z.string()),
  variantName: z.record(z.string(), z.string()),
  metaTitle: z.record(z.string(), z.string()),
  metaDescription: z.record(z.string(), z.string()),
  usp: z.record(z.string(), z.string()),
  advantages: z.record(z.string(), z.tuple([z.string(), z.string(), z.string()])),
  stock: z.string(),
  stockEta: z.string().nullable(),
  stockClassification: stockClassificationSchema,
  shippingWeight: z.number().optional(),
  eprelCertCode: z.string().optional(),
  restrictToNewProducts: z.boolean().optional(),
  lockKey: z.string(),
})

const syncPriceVariantsAndStockSchema = z.object({}).optional()

const syncPriceVariantsAndStockBatchSchema = z.object({
  articleIds: z.array(z.string()),
})

const syncPriceVariantToCrystallizeSchema = z.object({
  sku: z.string(),
  crystallizeId: z.string(),
  lockKey: z.string(),
  treePath: z.string().nullable().optional(),
  priceVariants: z.array(z.object({ identifier: z.string(), price: z.number() })),
  shippingWeight: z.number().optional(),
})

const stockUpdateSchema = z.object({
  sku: z.string(),
  type: z.enum(['stock', 'backorder', 'order_item', 'not_available']),
  quantity: z.number().int().nonnegative(),
  stockLocation: z.string(),
  meta: z
    .object({
      etaDate: z.string().optional(),
      deliveryLength: z.number().int().nonnegative().optional(),
      deliveryUnit: z.enum(['days', 'weeks']).optional(),
    })
    .default({}),
})

const syncStockCronSchema = z.object({}).optional()

const syncEprelLabelsSchema = z.object({
  sku: z.string(),
  crystallizeId: z.string(),
  eprelCertCode: z.string().optional(),
  languages: z.array(z.string()),
  lockKey: z.string().optional(),
  force: z.boolean().optional(),
})

const syncStockInformationSchema = z.object({
  articleIds: z.array(z.string()),
})

const syncOrdersSchema = z.object({
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  lookbackMinutes: z.number().int().positive().optional(),
})

const orderRowDtoSchema = z.object({
  articleId: z.string(),
  rowId: z.string(),
  name: z.string(),
  priceNet: z.number(),
  quantity: z.number(),
  vat: z.number(),
  discount: z.number(),
})

const orderDtoSchema = z.object({
  orderId: z.string(),
  orderSerial: z.string(),
  orderStatus: z.string(),
  orderReference: z.string().nullable(),
  orderComment: z.string().nullable(),
  orderCreated: z.string(),
  orderSent: z.string().nullable(),
  orderPaid: z.string().nullable(),
  orderPaidStatus: z.string(),
  currencyCode: z.string(),
  paymentName: z.string().nullable(),
  siteId: z.string(),
  siteName: z.string().nullable(),
  country: z.string().nullable(),
  email: z.string(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  phone: z.string().nullable(),
  customerId: z.string(),
  customerNumber: z.string(),
  customerName: z.string().nullable(),
  customerAddress: z.string().nullable(),
  customerCity: z.string().nullable(),
  customerPostal: z.string().nullable(),
  shippingName: z.string().nullable(),
  shippingAddress: z.string().nullable(),
  shippingCity: z.string().nullable(),
  shippingPostal: z.string().nullable(),
  rows: z.array(orderRowDtoSchema),
  totalNet: z.number(),
})

const sendContactFormSchema = z.object({
  fields: z.object({
    email: z.string(),
    message: z.string(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    phone: z.string().optional(),
  }),
})

const updateReceiverSchema = z.record(z.string(), z.unknown())

export const eventSchemas = new EventSchemas().fromSchema({
  'ls-bolagen/sync-products': syncProductsSchema,
  'ls-bolagen/sync-product-to-crystallize': productDtoSchema,
  'ls-bolagen/sync-price-variants-and-stock': syncPriceVariantsAndStockSchema,
  'ls-bolagen/sync-price-variants-and-stock-batch': syncPriceVariantsAndStockBatchSchema,
  'ls-bolagen/sync-price-variant-to-crystallize': syncPriceVariantToCrystallizeSchema,
  'ls-bolagen/sync-eprel-labels': syncEprelLabelsSchema,
  'ls-bolagen/sync-stock-cron': syncStockCronSchema,
  'ls-bolagen/sync-stock-information': syncStockInformationSchema,
  'ls-bolagen/stock-update': stockUpdateSchema,
  'ls-bolagen/sync-order-in-ls-admin': z.object({
    crystallizeOrderId: z.string(),
    briqpaySessionId: z.string(),
    cartId: z.string(),
    domain: z.string(),
  }),
  'ls-bolagen/orders-update-briqpay-references': z.object({
    briqpaySessionId: z.string(),
    crystallizeOrderId: z.string(),
    orderNumberWeb: z.string().optional(),
    cartId: z.string().optional(),
    domain: z.string().optional(),
  }),
  'ls-bolagen/sync-orders': syncOrdersSchema,
  'ls-bolagen/sync-order-to-crystallize': orderDtoSchema,
  'ls-bolagen/send-contact-form': sendContactFormSchema,
  'ls-bolagen/product-update-receiver': updateReceiverSchema,
  'ls-bolagen/order-update-receiver': updateReceiverSchema,
})
