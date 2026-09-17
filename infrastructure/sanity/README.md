# Sanity

Sanity integration for the application infrastructure layer.

The goal of this folder is to isolate the configuration and connection to Sanity from the rest of the application.

```text
infrastructure/
└── cms/
    └── sanity/
        ├── client.ts
        ├── config.ts
        └── README.md
```

## Installation

Install the official Sanity client:

```bash
npm install @sanity/client
```

## Environment variables

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-01-01
```

Do not hardcode project IDs, datasets, tokens or other project-specific configuration in the client.

---

## Configuration

`config.ts` contains the configuration required by the Sanity client.

```ts
export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion:
    process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2026-01-01',
  useCdn: process.env.NODE_ENV === 'production',
}
```

This keeps configuration separate from the actual client.

---

## Client

`client.ts` creates the connection to Sanity.

```ts
import { createClient } from '@sanity/client'

import { sanityConfig } from './config'

export const sanityClient = createClient(sanityConfig)
```

The client is our low-level entry point to Sanity.

Its responsibility is simple:

```text
configure
    ↓
connect
    ↓
request
    ↓
return data
```

It should not contain application or business logic.

---

# Architecture

Sanity is only one possible data provider.

The rest of the application should avoid depending directly on Sanity whenever possible.

A typical flow looks like:

```text
Sanity API
    ↓
infrastructure
    ↓
repository
    ↓
DTO / schema
    ↓
application
    ↓
UI
```

For example:

```text
Sanity API
    ↓
sanityClient
    ↓
loadPageBySlug()
    ↓
pageDto()
    ↓
loadPage()
    ↓
page.tsx
```

Each layer has a different responsibility.

---

## Infrastructure

Infrastructure knows **how to communicate with Sanity**.

```ts
sanityClient.fetch(...)
```

It knows about things such as:

- Sanity configuration
- project ID
- dataset
- API version
- authentication
- GROQ requests

It should not decide how the application uses that data.

---

## Repository

The repository defines the data operations required by a domain.

For example:

```ts
export async function loadPageBySlug(slug: string) {
  return sanityClient.fetch(
    `*[_type == "page" && slug.current == $slug][0]`,
    { slug }
  )
}
```

This could live somewhere like:

```text
domains/
└── page/
    └── repository/
        └── load-page-by-slug.ts
```

The repository knows:

> "I need to load a page by its slug."

Infrastructure knows:

> "This is how we communicate with Sanity."

That distinction is important.

---

## DTO

External APIs rarely return data in exactly the shape the application wants.

A DTO can transform provider data into our own application structure.

```text
Sanity response
      ↓
pageDto()
      ↓
Page
```

For example:

```ts
const pageDto = (data: SanityPageResponse): Page => ({
  title: data.title,
  slug: data.slug.current,
})
```

This helps prevent Sanity-specific response structures from leaking throughout the application.

---

## Schema

Schemas can validate the data entering the application.

For example with Zod:

```ts
const PageSchema = z.object({
  title: z.string(),
  slug: z.string(),
})
```

This gives us a boundary between external data and trusted application data.

A useful mental model is:

```text
External data
     ↓
DTO
     ↓
Schema
     ↓
Application data
```

The exact order can vary depending on the project and where validation is performed.

---

## Application

The application layer contains use-case and business logic.

For example:

```ts
async function loadPage(slug: string) {
  const page = await loadPageBySlug(slug)

  if (!page) {
    return undefined
  }

  return page
}
```

More complex applications may combine multiple repositories:

```text
loadProductPage()
      ↓
 ┌────┴─────┐
 ↓          ↓
Product     Reviews
Repository  Repository
```

The application layer should not care whether those repositories ultimately use Sanity, Crystallize, Supabase or another provider.

---

# Why this architecture matters

The important part is not Sanity itself.

The important part is that the provider is kept behind an infrastructure boundary.

Today we might have:

```text
Sanity
  ↓
Repository
  ↓
Application
  ↓
UI
```

Another project might use:

```text
Crystallize
  ↓
Repository
  ↓
Application
  ↓
UI
```

Or:

```text
Supabase
  ↓
Repository
  ↓
Application
  ↓
UI
```

The provider changes.

The architectural flow can remain largely the same.

---

# Multiple providers

A project can also use several providers at the same time.

```text
infrastructure/
├── cms/
│   ├── sanity/
│   └── crystallize/
│
├── database/
│   └── supabase/
│
└── search/
    └── meilisearch/
```

For example:

```text
                Application
                     ↓
              Product Repository
                ↙          ↘
        Crystallize       Supabase
```

Or different domains may depend on completely different infrastructure:

```text
Product domain ─────→ Crystallize
Content domain ─────→ Sanity
Account domain ─────→ Supabase
Search domain ──────→ Meilisearch
```

The UI does not need to know those implementation details.

---

# Avoid

Avoid querying Sanity directly throughout the UI:

```tsx
// Avoid

export default async function Page() {
  const page = await sanityClient.fetch(...)

  return ...
}
```

This tightly couples the page to Sanity.

Prefer:

```tsx
export default async function Page() {
  const page = await loadPage(...)

  return ...
}
```

Now the page depends on our application/domain API instead of directly depending on the CMS.

---

# Mental model

Think about the layers like this:

```text
UI
│
│ "Give me the page"
↓
Application
│
│ "What needs to happen?"
↓
Repository
│
│ "What data do I need?"
↓
Infrastructure
│
│ "How do I talk to this provider?"
↓
Sanity
```

Or, more generally:

```text
UI
 ↓
Application
 ↓
Repository
 ↓
Infrastructure
 ↓
External provider
```

Sanity, Crystallize, Supabase, Shopify, Meilisearch or another service can sit at the bottom.

The layers above should remain as independent from the provider as reasonably possible.

---

## Principle

Infrastructure knows **how to talk to Sanity**.

Repositories know **what data the domain needs**.

DTOs know **how external data becomes application data**.

Schemas know **what valid application data looks like**.

Application knows **what the use case should do**.

UI knows **how to present the result**.

Keeping those responsibilities separate makes integrations easier to understand, test, replace and reuse.
