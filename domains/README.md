# Domains

The `domains` folder organizes business logic around the concepts that exist in the application.

Instead of organizing everything by technical type:

```text
src/
├── repositories/
├── schemas/
├── dto/
└── utils/
```

we organize code around business domains:

```text
domains/
├── product/
├── category/
├── cart/
├── customer/
└── checkout/
```

Each domain owns the logic and data structures related to that specific part of the application.

This approach is inspired by **Domain-Driven Design (DDD)**, adapted pragmatically for frontend applications.

---

# Why domains?

A domain represents a meaningful concept in the application.

For an e-commerce application, examples could be:

```text
product
category
cart
customer
checkout
inventory
order
```

These concepts are more important to the architecture than the technologies used to implement them.

For example:

```text
React
Next.js
Sanity
Crystallize
Shopify
Zod
GraphQL
```

are technologies.

While:

```text
Product
Cart
Customer
Checkout
```

are concepts belonging to the application itself.

The goal is to make the structure of the code reflect the structure of the problem we are solving.

---

# Example structure

A domain may contain:

```text
domains/
└── product/
    ├── application/
    ├── dto/
    ├── fragment/
    ├── infrastructure/
    ├── repository/
    ├── schema/
    └── utils/
```

Not every domain needs every folder.

A simple domain might only contain:

```text
page/
├── repository/
├── dto/
└── schema/
```

A more complex domain might contain:

```text
cart/
├── application/
├── repository/
├── infrastructure/
├── dto/
├── schema/
└── utils/
```

Create layers because they solve a problem, not because the folder structure says they must exist.

---

# Application

The `application` layer contains use cases and business logic.

It answers:

> What should the application do?

For example:

```text
application/
├── load-valid-cart.ts
├── add-product-to-cart.ts
└── calculate-checkout.ts
```

An application function may coordinate several repositories or infrastructure operations.

```ts
async function loadValidCart() {
  const cart = await loadCart()

  if (!cart || cart.isExpired) {
    return undefined
  }

  return cart
}
```

The important part is that the function is doing more than simply fetching data.

It represents a **use case**.

---

# Repository

The `repository` layer defines the data operations required by the domain.

It answers:

> What data does this domain need?

For example:

```text
product/
└── repository/
    ├── load-product-by-slug.ts
    └── load-related-products.ts
```

A repository might internally use Sanity:

```ts
export async function loadProductBySlug(slug: string) {
  return sanityClient.fetch(...)
}
```

Another project might use Shopify:

```ts
export async function loadProductBySlug(slug: string) {
  return shopifyClient.request(...)
}
```

The rest of the application can still work with:

```ts
loadProductBySlug(slug)
```

instead of knowing how the external provider works.

---

# Infrastructure

Infrastructure handles communication with external systems.

It answers:

> How do we communicate with this provider?

Examples:

```text
Sanity
Crystallize
Shopify
Supabase
Meilisearch
external REST APIs
```

Shared infrastructure usually lives at the root:

```text
infrastructure/
├── cms/
│   ├── sanity/
│   └── crystallize/
├── commerce/
│   └── shopify/
└── database/
    └── supabase/
```

A domain may also contain infrastructure that exists exclusively for that domain:

```text
domains/
└── cart/
    └── infrastructure/
```

The general rule is:

```text
Used across domains
→ root infrastructure/

Only meaningful inside one domain
→ domains/<domain>/infrastructure/
```

Infrastructure should contain as little business logic as possible.

Its main responsibility is:

```text
configure
connect
request
return
```

---

# DTO

DTO stands for **Data Transfer Object**.

The DTO layer transforms external data into a shape that better fits the application.

It answers:

> How do we transform external data into our domain data?

An external provider might return:

```ts
{
  item: {
    name: 'Outdoor kitchens',
    path: '/outdoor-kitchens',
    components: [...]
  }
}
```

But the application might want:

```ts
{
  title: 'Outdoor kitchens',
  slug: '/outdoor-kitchens'
}
```

A DTO can perform that transformation:

```ts
export function pageDto(data: ExternalPage): Page {
  return {
    title: data.name,
    slug: data.path,
  }
}
```

This prevents provider-specific data structures from spreading throughout the application.

---

# Schema

Schemas describe and validate the data used by the domain.

Zod is a useful option:

```ts
import { z } from 'zod'

export const ProductSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
})

export type Product = z.infer<typeof ProductSchema>
```

Schemas create a clear boundary between external data and data we trust inside the application.

A useful mental model is:

```text
External data
     ↓
DTO / validation
     ↓
Domain data
```

The exact validation/transformation order may vary depending on the integration.

---

# Fragments

The `fragment` folder contains reusable GraphQL fragments associated with the domain.

For example:

```text
category/
└── fragment/
    └── category-fragments.ts
```

A fragment might describe the fields required by that domain:

```graphql
fragment CategoryFields on Item {
  name
  path
}
```

Fragments are provider-specific, but keeping domain-specific fragments close to the domain can make queries easier to understand and maintain.

Generic provider configuration should still remain in:

```text
infrastructure/
```

---

# Utils

Domain-specific utilities can live inside the domain:

```text
category/
└── utils/
    ├── filter-processing.ts
    ├── sort-processing.ts
    └── constants.ts
```

These utilities should contain logic that only makes sense in the context of that domain.

For example:

```ts
processCategoryFilters()
processCategorySorting()
```

should probably live in:

```text
domains/category/utils/
```

while something generic such as:

```ts
formatDate()
```

may belong in a shared utility location.

A useful rule:

> If the utility only makes sense when talking about this domain, keep it inside the domain.

---

# Dependency direction

A useful mental model for the architecture is:

```text
UI
 ↓
Application
 ↓
Repository
 ↓
Infrastructure
 ↓
External Provider
```

For example:

```text
ProductPage
     ↓
loadProductPage()
     ↓
loadProductBySlug()
     ↓
shopifyClient.request()
     ↓
Shopify Storefront API
```

DTOs and schemas typically live around the data boundary:

```text
External Provider
       ↓
Infrastructure
       ↓
Repository
       ↓
DTO / Schema
       ↓
Domain data
       ↓
Application
       ↓
UI
```

This is a conceptual model, not a rule requiring every request to pass through every possible layer.

---

# Example with Sanity

Consider a simple page domain:

```text
domains/
└── page/
    ├── application/
    │   └── load-page.ts
    │
    ├── repository/
    │   └── load-page-by-slug.ts
    │
    ├── dto/
    │   └── page-dto.ts
    │
    └── schema/
        └── page-schema.ts
```

Infrastructure lives separately:

```text
infrastructure/
└── cms/
    └── sanity/
        ├── client.ts
        └── config.ts
```

The flow becomes:

```text
Next.js page
     ↓
loadPage()
     ↓
loadPageBySlug()
     ↓
sanityClient.fetch()
     ↓
Sanity
```

The Sanity response can then be validated and transformed into the application's `Page` model.

---

# External providers are implementation details

One of the main benefits of this separation is reducing coupling to external providers.

Today:

```text
Product
   ↓
Shopify
```

Tomorrow:

```text
Product
   ↓
another commerce API
```

Ideally the UI and most application logic should not need to know about that change.

The same idea applies to CMS providers:

```text
Page
 ↓
Sanity
```

or:

```text
Page
 ↓
Crystallize
```

The provider changes.

The domain concept remains.

---

# When should a domain exist?

Do not create a domain simply because something has a TypeScript type.

A domain becomes useful when a concept starts owning meaningful:

- data
- rules
- transformations
- queries
- mutations
- use cases
- validation

For example:

```text
cart
product
customer
checkout
```

are strong candidates in an e-commerce application.

Something like:

```text
button
modal
carousel
```

is not a business domain.

Those belong to the UI layer.

---

# Do not over-engineer small domains

Not every domain needs:

```text
application/
repository/
dto/
schema/
infrastructure/
utils/
fragment/
```

If all we need is:

```ts
loadPageBySlug()
```

then this may initially be enough:

```text
page/
└── repository/
    └── load-page-by-slug.ts
```

Later, if transformation becomes necessary:

```text
page/
├── repository/
└── dto/
```

Then validation:

```text
page/
├── repository/
├── dto/
└── schema/
```

Then real use-case logic:

```text
page/
├── application/
├── repository/
├── dto/
└── schema/
```

Let the architecture grow with the complexity of the domain.

---

# DDD and this structure

This architecture is **inspired by Domain-Driven Design**, but it should not be considered a strict implementation of every DDD concept.

DDD includes broader concepts such as:

```text
Bounded Contexts
Entities
Value Objects
Aggregates
Domain Services
Ubiquitous Language
```

A frontend project does not automatically need all of them.

The goal here is to take the useful principle:

> Organize important business logic around the domain instead of around frameworks and technical implementation details.

If the project becomes complex enough, deeper DDD concepts can be introduced when they provide real value.

---

# When not to use this structure

A small application may not need a domain layer at all.

For example:

```text
Portfolio
├── Home
├── About
├── Projects
└── Contact
```

with simple Sanity queries might work perfectly with:

```text
src/
├── app/
├── components/
├── sanity/
└── styles/
```

Adding:

```text
domains/
application/
repository/
dto/
schema/
```

would not automatically make the application better.

The architecture should be proportional to the complexity of the problem.

---

# Principle

Think first in terms of the application:

```text
Product
Cart
Customer
Checkout
```

and second in terms of technology:

```text
React
Next.js
GraphQL
Sanity
Shopify
Zod
```

Domains describe **what the application is about**.

Infrastructure describes **what the application talks to**.

Application describes **what the application does**.

UI describes **what the user sees and interacts with**.
