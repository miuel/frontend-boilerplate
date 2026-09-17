import { createClient, createBinaryFileManager } from '@crystallize/js-api-client'
import { crystallizeConfig } from './client'

const apiClient = createClient(crystallizeConfig)
const fileManager = createBinaryFileManager(apiClient)

export type UploadKind = 'MEDIA' | 'STATIC'

export async function uploadBufferToCrystallize(params: {
  buffer: Buffer
  mimeType: string
  filename: string
  kind: UploadKind
}): Promise<string> {
  const { buffer, mimeType, filename, kind } = params
  return fileManager.uploadToTenant({
    type: kind,
    mimeType,
    filename,
    buffer,
  } as Parameters<typeof fileManager.uploadToTenant>[0])
}

const IMAGE_RESULT = `__typename ... on Image { key }`

/**
 * Registers an uploaded image as a DAM record so its key can be referenced by
 * multiple components/languages without Crystallize trying to insert the same
 * file `_id` twice (which throws E11000). Idempotent for an already-registered key.
 */
export async function registerCrystallizeImage(key: string): Promise<void> {
  await apiClient.nextPimApi(
    `mutation Register($k: String!) { registerImage(imageKey: $k) { ${IMAGE_RESULT} } }`,
    { k: key }
  )
}

/** Tags a DAM image with topics (e.g. the Big Label topic). */
export async function setImageTopics(key: string, topicIds: string[]): Promise<void> {
  await apiClient.nextPimApi(
    `mutation Tag($k: String!, $i: UpdateImageInput!) {
       updateImage(key: $k, language: "en", input: $i) { ${IMAGE_RESULT} }
     }`,
    { k: key, i: { topicIds } }
  )
}
