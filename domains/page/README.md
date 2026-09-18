# Page Domain

A small reference implementation showing how a domain can communicate with an external CMS while keeping the UI independent from the provider.

This example uses **Sanity**, but the same architectural pattern can be applied to other providers.

## Structure

```text
page/
├── application/
│   └── load-page.ts
├── dto/
│   └── page-dto.ts
├── repository/
│   └── load-page-by-slug.ts
├── schema/
│   └── page-schema.ts
└── README.md
```

The Sanity integration itself lives outside the domain:

```text
infrastructure/
└── cms/
    └── sanity/
        ├── client.ts
        └── config.ts
```

---

# Flow

The complete flow is:

```text
Next.js page
     ↓
loadPage()
     ↓
loadPageBySlug()
     ↓
sanityClient.fetch()
     ↓
Sanity API
     ↓
pageDto()
     ↓
PageSchema.parse()
     ↓
Page
     ↓
UI
```

The important part is that the UI does not need to know that Sanity exists.

---

# Application

```text
application/
└── load-page.ts
```

Represents the use case exposed to the application.

```ts
import { loadPageBySlug } from '../repository/load-page-by-slug'

export async function loadPage(slug: string) {
  const page = await loadPageBySlug(slug)

  if (!page) {
    return undefined
  }

  return page
}
```

For this simple example, the application layer does very little.

That is intentional.

In a real application this layer becomes useful when a use case needs to coordinate business logic, multiple repositories or other operations.

If a domain has no application logic, this layer does not need to exist.

---

# Repository

```text
repository/
└── load-page-by-slug.ts
```

The repository describes what data the domain needs.

```ts
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
```

The repository coordinates the data boundary:

```text
request
   ↓
external data
   ↓
transform
   ↓
validate
   ↓
domain data
```

---

# DTO

```text
dto/
└── page-dto.ts
```

The DTO transforms Sanity-specific data into the representation expected by our domain.

Sanity may return:

```ts
{
  _id: 'abc123',
  title: 'About us',
  slug: {
    current: 'about-us'
  }
}
```

Our application wants:

```ts
{
  id: 'abc123',
  title: 'About us',
  slug: 'about-us'
}
```

The transformation is handled by:

```ts
pageDto(data)
```

This prevents provider-specific structures such as:

```text
_id
slug.current
```

from spreading through the application.

---

# Schema

```text
schema/
└── page-schema.ts
```

The schema defines what a valid `Page` looks like inside our application.

```ts
import { z } from 'zod'

export const PageSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  description: z.string().optional(),
})

export type Page = z.infer<typeof PageSchema>
```

The repository performs runtime validation:

```ts
PageSchema.parse(pageDto(data))
```

This creates a boundary:

```text
External / untrusted data
          ↓
         DTO
          ↓
    Zod validation
          ↓
    trusted Page
```

If the external provider returns an unexpected shape, the problem is detected at the data boundary instead of later inside the UI.

---

# Infrastructure

The domain does not configure Sanity itself.

That responsibility belongs to:

```text
infrastructure/
└── cms/
    └── sanity/
```

Infrastructure knows:

> How do I communicate with Sanity?

The repository knows:

> What page data do I need?

The DTO knows:

> How do I transform that external data?

The schema knows:

> What does a valid Page look like?

The application layer knows:

> What should the application do with that Page?

---

# Next.js usage

The repository does not need an `app/` folder in this boilerplate.

A real Next.js application could consume the domain like this:

```tsx
import { notFound } from 'next/navigation'

import { loadPage } from '@/domains/page/application/load-page'

type PageProps = {
  params: Promise<{
    slug: string[]
  }>
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params

  const page = await loadPage(slug.join('/'))

  if (!page) {
    notFound()
  }

  return (
    <main>
      <h1>{page.title}</h1>

      {page.description && (
        <p>{page.description}</p>
      )}
    </main>
  )
}
```

Notice what the Next.js page does **not** import:

```text
sanityClient
GROQ queries
PageSchema
pageDto
```

It only knows about:

```ts
loadPage()
```

---

# Why this matters

The UI depends on our application API:

```text
UI
 ↓
loadPage()
```

rather than directly on:

```text
UI
 ↓
Sanity
```

This reduces coupling between the frontend and the external provider.

If the data source changes later, much of the application can remain unchanged.

For example:

```text
Today

Page
 ↓
Sanity
```

could eventually become:

```text
Page
 ↓
Crystallize
```

while the UI may still call:

```ts
loadPage(slug)
```

---

# Mental model

Each layer should answer a different question:

```text
UI
"What do I display?"

        ↓

Application
"What should happen?"

        ↓

Repository
"What data do I need?"

        ↓

Infrastructure
"How do I communicate with the provider?"

        ↓

External service
```

DTOs and schemas protect the boundary between external data and our domain model.

---

# Keep it proportional

This example intentionally shows several architectural layers for educational purposes.

A simple project does not automatically need:

```text
application/
dto/
repository/
schema/
```

Start with the minimum structure required by the domain and introduce boundaries when they provide value.

The purpose of this example is to understand the responsibilities, not to require every domain to reproduce this exact folder structure.
