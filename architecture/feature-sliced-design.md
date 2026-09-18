# Feature-Sliced Design

Feature-Sliced Design (FSD) is a frontend architecture methodology that organizes an application around **business entities, user features and composition**, rather than primarily around technical file types.

Instead of growing towards:

```text
components/
hooks/
services/
utils/
api/
```

FSD encourages us to think about what the application contains and what the user can actually do.

For example, in an e-commerce application:

```text
Product
Cart
Customer

Add to cart
Search
Filter products
Sign in
```

These concepts can become explicit architectural boundaries.

---

# Why FSD?

Modern frontend applications contain more than reusable components.

They contain:

- business entities
- user interactions
- page composition
- reusable UI
- API integrations
- state
- complex features

As the application grows, putting everything inside:

```text
components/
```

can make ownership and dependencies difficult to understand.

FSD introduces explicit layers for these responsibilities.

---

# Core structure

A full FSD architecture commonly uses layers such as:

```text
src/
├── app/
├── pages/
├── widgets/
├── features/
├── entities/
└── shared/
```

Each layer has a different responsibility.

The exact structure should be adapted to the project.

Not every application needs every layer.

---

# App

`app` contains application-level configuration and composition.

Examples:

```text
app/
├── providers/
├── routing/
├── styles/
└── config/
```

In Next.js, the framework already provides an `app/` directory.

Because of this, the exact relationship between Next.js App Router and the FSD `app` layer should be adapted pragmatically rather than duplicated unnecessarily.

Typical responsibilities include:

```text
global providers
global styles
routing
application initialization
global configuration
```

---

# Entities

An **entity** represents an important business concept.

For an e-commerce application:

```text
entities/
├── product/
├── cart/
├── customer/
├── collection/
└── order/
```

A `product` entity might contain:

```text
entities/
└── product/
    ├── api/
    ├── model/
    ├── ui/
    └── index.ts
```

For example:

```text
model/
→ Product types and domain state

api/
→ product-related data operations

ui/
→ ProductCard or ProductPrice
```

The key idea is:

> An entity represents something meaningful in the domain.

---

# Features

A **feature** represents something the user can do or a meaningful application capability.

Examples:

```text
features/
├── add-to-cart/
├── search/
├── product-filtering/
├── product-sorting/
├── sign-in/
└── wishlist/
```

This distinction is useful:

```text
Product
→ entity

Add product to cart
→ feature
```

Another example:

```text
Customer
→ entity

Sign in
→ feature
```

Or:

```text
Product
→ entity

Filter products
→ feature
```

Features usually combine entities, state and UI to implement user behavior.

---

# Shared

`shared` contains reusable code that does not belong to a specific business entity or feature.

For example:

```text
shared/
├── ui/
├── api/
├── hooks/
├── lib/
├── config/
└── styles/
```

This maps naturally to many things already present in this boilerplate.

For example:

```text
shared/ui/
├── Button/
├── Typography/
├── Accordion/
├── Drawer/
├── Flex/
├── Form/
└── Video/
```

These components are reusable primitives.

They do not know about:

```text
Product
Cart
Customer
Checkout
```

That is exactly why they are shared.

---

# Widgets

Widgets compose entities and features into larger reusable interface sections.

Examples:

```text
widgets/
├── header/
├── footer/
├── product-gallery/
├── product-listing/
└── cart-drawer/
```

Consider a `Header`.

It may combine:

```text
Logo
Navigation
Search
Account
Cart
Mobile menu
```

Some of these may themselves be features or entities.

The widget composes them into a larger UI block.

This maps particularly well to components such as the Header patterns used in this boilerplate.

---

# Pages

Pages compose widgets, features and entities into complete screens.

For example:

```text
pages/
├── home/
├── product/
├── collection/
└── search/
```

Conceptually:

```text
Product Page
    │
    ├── Product Gallery
    ├── Product Information
    ├── Add To Cart
    ├── Product Story
    └── Recommendations
```

With Next.js App Router, routing already lives inside:

```text
app/
```

Therefore, creating a separate FSD `pages/` layer is not always necessary.

A pragmatic Next.js implementation may allow `app/` routes to perform page composition directly.

---

# Slices

Inside a layer, functionality is divided into **slices**.

For example:

```text
features/
├── add-to-cart/
├── search/
└── product-filtering/
```

Each of these is a slice.

Likewise:

```text
entities/
├── product/
├── cart/
└── customer/
```

Each entity is its own slice.

Slices create boundaries between different parts of the application.

---

# Segments

Inside a slice, code can be divided by technical responsibility.

For example:

```text
features/
└── add-to-cart/
    ├── ui/
    ├── model/
    ├── api/
    └── lib/
```

These folders are called **segments**.

A useful distinction is:

```text
Layer
  ↓
Slice
  ↓
Segment
```

Example:

```text
features/           ← layer
└── add-to-cart/    ← slice
    ├── ui/         ← segment
    ├── model/
    └── api/
```

---

# Example: e-commerce

Consider an application using:

```text
Next.js
Shopify Storefront API
Sanity
GSAP
```

A possible FSD-inspired structure could be:

```text
src/
├── app/
│
├── widgets/
│   ├── header/
│   ├── footer/
│   ├── product-listing/
│   └── cart-drawer/
│
├── features/
│   ├── add-to-cart/
│   ├── search/
│   ├── product-filtering/
│   ├── product-sorting/
│   └── sign-in/
│
├── entities/
│   ├── product/
│   ├── cart/
│   ├── customer/
│   └── collection/
│
└── shared/
    ├── ui/
    ├── api/
    │   ├── shopify/
    │   └── sanity/
    ├── hooks/
    ├── lib/
    └── styles/
```

This makes the responsibilities visible directly from the folder structure.

---

# Shopify and Sanity

External providers should not define the entire architecture.

For example:

```text
shared/api/
├── shopify/
│   ├── client.ts
│   └── config.ts
│
└── sanity/
    ├── client.ts
    └── config.ts
```

Shopify may provide:

```text
products
variants
prices
inventory
cart
```

Sanity may provide:

```text
editorial content
landing pages
campaigns
storytelling
SEO
```

The application can combine both.

For example:

```text
             Product Page
             /          \
            ↓            ↓
        Shopify        Sanity
            ↓            ↓
       Product data   Editorial
            \            /
             ↓          ↓
                  UI
                   ↓
                 GSAP
```

The UI does not need to treat the entire application as either a "Shopify app" or a "Sanity app".

They are external data providers.

---

# GSAP and animation

GSAP is generally a presentation concern rather than an entity or business feature.

Generic animation helpers might live in:

```text
shared/
└── lib/
    └── animation/
```

while animation specific to a feature or widget should remain close to that feature.

For example:

```text
widgets/
└── hero/
    ├── ui/
    └── lib/
        └── animations.ts
```

A useful rule is:

> Keep generic animation utilities shared, but keep animation behavior close to the UI that owns it.

---

# Dependency direction

One of the important ideas in FSD is controlling dependencies between layers.

Conceptually, higher-level composition depends on lower-level building blocks:

```text
app
 ↓
pages
 ↓
widgets
 ↓
features
 ↓
entities
 ↓
shared
```

For example:

```text
feature
   ↓
entity
   ↓
shared
```

is natural.

But:

```text
shared
   ↓
feature
```

would break the responsibility of `shared`.

A `Button` should not need to know about `add-to-cart`.

Instead:

```text
AddToCart
    ↓
Button
```

---

# Public API

Slices can expose a controlled public API through `index.ts`.

For example:

```text
features/
└── add-to-cart/
    ├── ui/
    │   └── AddToCartButton.tsx
    ├── model/
    │   └── use-add-to-cart.ts
    └── index.ts
```

Then other parts of the application import:

```ts
import { AddToCartButton } from '@/features/add-to-cart'
```

instead of:

```ts
import { AddToCartButton } from '@/features/add-to-cart/ui/AddToCartButton'
```

This prevents consumers from depending on internal implementation details.

---

# FSD does not mean maximum folders

A feature does not automatically need:

```text
ui/
model/
api/
lib/
config/
```

A simple feature might be:

```text
features/
└── product-sorting/
    ├── ProductSorting.tsx
    └── index.ts
```

If it grows:

```text
product-sorting/
├── ui/
├── model/
├── lib/
└── index.ts
```

The architecture should evolve with the feature.

---

# How this relates to this boilerplate

This boilerplate currently uses concepts such as:

```text
components/
domains/
infrastructure/
styles/
```

These should not be renamed simply to make the repository look like FSD.

Instead, FSD provides another architectural model that can be used when starting a project where feature-oriented organization makes sense.

Several concepts map naturally:

```text
Current boilerplate       FSD concept

components/               shared/ui
styles/                   shared/styles
infrastructure/           shared/api (partially)
domains/product           entities/product (partially)
UI feature                features/*
Header / Footer           widgets/*
```

These are **conceptual similarities**, not exact one-to-one equivalents.

DDD and FSD solve different architectural concerns.

---

# When FSD can be useful

FSD becomes interesting when the frontend contains many independent user capabilities such as:

```text
search
filtering
sorting
wishlist
authentication
cart interactions
product comparison
recommendations
navigation
```

It provides explicit places for those capabilities to live.

This can be particularly useful for interactive e-commerce applications.

---

# When FSD may be unnecessary

A small website such as:

```text
Home
About
Projects
Contact
```

may not benefit from:

```text
widgets/
features/
entities/
shared/
```

A simpler structure may be easier to maintain.

As with any architecture:

> Add structure when the complexity requires it.

---

# A pragmatic approach

FSD does not need to be adopted dogmatically.

For a Next.js application, a practical structure might be:

```text
src/
├── app/                 # Next.js routing and composition
│
├── widgets/
│
├── features/
│
├── entities/
│
└── shared/
    ├── ui/
    ├── api/
    ├── hooks/
    ├── lib/
    └── styles/
```

We may choose not to introduce a separate `pages/` layer because Next.js App Router already provides route-level composition.

We may also introduce domain-oriented ideas when business logic becomes sufficiently complex.

The goal is not to implement FSD perfectly.

The goal is to create **clear boundaries that make the frontend easier to understand and evolve**.

---

# Mental model

A useful way to remember FSD:

```text
shared
"What can anything use?"

      ↑

entities
"What things exist in the business?"

      ↑

features
"What can the user do?"

      ↑

widgets
"What larger UI sections do we compose?"

      ↑

app / pages
"What experience do we present?"
```

For an e-commerce application:

```text
Button                  → shared
Product                 → entity
Add to cart             → feature
Product purchase panel  → widget
Product page            → page/app route
```

That distinction is the core idea worth remembering.

---

# Principle

Organize frontend code around **meaning and responsibility**, not only around file type.

Use:

```text
entities
```

for important business concepts.

Use:

```text
features
```

for meaningful user capabilities.

Use:

```text
widgets
```

for larger composed interface sections.

Use:

```text
shared
```

for reusable foundations that know nothing about specific features.

And keep the architecture proportional to the complexity of the application.
