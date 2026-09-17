import { Locale } from '@/domains/locale'
import { BRAND_ID } from '@/domains/brands/config/brand-config'

export function getClerkKey(locale: Locale, keyType: 'publishable' | 'secret') {
  const localeFormat = locale.replace('-', '_').toUpperCase()
  const publishableEnv = `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY_${BRAND_ID}_${localeFormat}`
  const secretEnv = `CLERK_SECRET_KEY_${BRAND_ID}_${localeFormat}`
  const envToUse = keyType === 'publishable' ? publishableEnv : secretEnv
  const key = process.env[envToUse]

  if (!key) {
    throw new Error(`Clerk env ${envToUse} not setup`)
  }

  return key
}
