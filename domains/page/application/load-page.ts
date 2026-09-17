import { loadPageBySlug } from '../repository/load-page-by-slug'

export async function loadPage(slug: string) {
  const page = await loadPageBySlug(slug)

  if (!page) {
    return undefined
  }

  return page
}
