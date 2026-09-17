import { NonRetriableError } from 'inngest'
import { crystallizeClient } from './client'

const TRANSIENT_ERROR_PATTERNS = [
  /failed to acquire lock/i,
  /rate limit/i,
  /too many requests/i,
  /timeout/i,
  /econnreset/i,
  /etimedout/i,
  /\b5\d{2}\b/,
]

function serializeError(error: unknown): string {
  if (typeof error === 'string') return error
  if (error instanceof Error) return error.message
  if (Array.isArray(error)) return error.map(serializeError).join(' | ')
  if (error && typeof error === 'object' && 'message' in error) {
    return String((error as { message: unknown }).message)
  }
  return JSON.stringify(error)
}

function isTransient(error: unknown): boolean {
  const message = serializeError(error)
  return TRANSIENT_ERROR_PATTERNS.some(pattern => pattern.test(message))
}

export async function crystallizeFetch<T>(options: {
  endpoint: 'pim' | 'core' | 'discovery'
  query: string
  variables: Record<string, unknown>
}): Promise<T> {
  const { data, error } = await crystallizeClient.fetch<T>(options)
  if (error) {
    const message = serializeError(error)
    if (isTransient(error)) throw new Error(message)
    throw new NonRetriableError(message)
  }
  if (!data) throw new NonRetriableError('No data returned from Crystallize')
  return data
}
