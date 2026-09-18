import { sanityClient } from '@/infrastructure/cms/sanity/client'

import { pageDto } from '../dto/page-dto'
import { PageSchema } from '../schema/page-schema'

const PAGE_BY_SLUG_QUERY = `
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description
  }
`

export async function loadPageBySlug(slug: string) {
  const data = await sanityClient.fetch(PAGE_BY_SLUG_QUERY, {
    slug,
  })

  if (!data) {
    return undefined
  }

  return PageSchema.parse(pageDto(data))
}
