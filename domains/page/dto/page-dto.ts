import type { Page } from '../schema/page-schema'

type SanityPageData = {
  _id: string
  title: string
  slug: {
    current: string
  }
  description?: string
}

export const pageDto = (data: SanityPageData): Page => {
  return {
    id: data._id,
    title: data.title,
    slug: data.slug.current,
    description: data.description,
  }
}
