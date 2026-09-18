# Domain-Driven Design

Domain-Driven Design (DDD) is an approach to software design that organizes software around the **business domain** rather than around frameworks, databases, APIs or other technical concerns.

The central idea is simple:

> The structure and language of the software should reflect the problem the software is solving.

Instead of starting with:

```text
components/
services/
schemas/
utils/
```

we start thinking about concepts such as:

```text
Product
Cart
Customer
Checkout
Inventory
Order
```

These concepts belong to the domain.

---

# Domain vs technology

Consider an e-commerce application.

Its domain contains concepts such as:

```text
Product
Category
Cart
Customer
Order
Inventory
Checkout
```

The implementation may use:

```text
Next.js
React
Shopify
Sanity
Crystallize
Supabase
Zod
GraphQL
```

The first group describes **what the application is about**.

The second group describes **how the application is built**.

DDD encourages us to keep that distinction visible in the architecture.

---

# Domain-oriented structure

A frontend application influenced by DDD might contain:

```text
src/
├── domains/
│   ├── product/
│   ├── category/
│   ├── cart/
│   ├── customer/
│   └── checkout/
│
├── infrastructure/
│   ├── cms/
│   ├── commerce/
│   └── database/
│
└── ui/
```

The domain remains central while external providers are treated as implementation details.

For example:

```text
Product
   ↓
Repository
   ↓
Shopify
```

rather than allowing Shopify concepts to define the entire application.

---

# DDD is more than folders

Creating:

```text
domains/
```

does not automatically mean an application is using Domain-Driven Design.

DDD contains deeper concepts such as:

```text
Domain
Subdomain
Bounded Context
Ubiquitous Language
Entity
Value Object
Aggregate
Repository
Domain Service
Application Service
```

Not every frontend application needs all of them.

Our boilerplate uses DDD ideas pragmatically rather than attempting to implement every DDD pattern.

---

# Ubiquitous Language

One of the most important DDD ideas is using a shared language between the software and the domain.

If the business talks about:

```text
Cart
Product
Order
Customer
Inventory
```

the code should preferably use the same concepts.

For example:

```ts
loadCart()
addProductToCart()
createOrder()
checkInventory()
```

is easier to reason about than generic terminology such as:

```ts
loadData()
processItem()
executeAction()
```

The names in the code should communicate the domain.

---

# Bounded Context

Large systems can contain concepts whose meaning changes depending on context.

DDD uses **Bounded Contexts** to establish explicit boundaries around those models.

For example, a `Product` may mean different things to:

```text
Catalogue
Inventory
Checkout
Marketing
```

The catalogue may care about:

```text
title
description
images
categories
```

Inventory may care about:

```text
sku
warehouse
availableQuantity
reservedQuantity
```

Marketing may care about:

```text
campaign
storytelling
SEO
editorialContent
```

DDD does not necessarily require one giant `Product` model shared everywhere.

Different contexts can model the same real-world concept differently.

---

# Entity

An Entity is an object defined primarily by its **identity**.

For example:

```ts
type Product = {
  id: string
  title: string
}
```

The title may change:

```text
"Chair"
→
"Oak Dining Chair"
```

but it can still represent the same Product because its identity remains:

```text
id: "product-123"
```

Typical entities might include:

```text
Product
Customer
Cart
Order
```

depending on the domain.

---

# Value Object

A Value Object is defined by its **value rather than its identity**.

For example:

```ts
type Money = {
  amount: number
  currency: string
}
```

Two values:

```ts
{
  amount: 100,
  currency: 'SEK'
}
```

represent the same value regardless of where they came from.

Other examples could include:

```text
Money
Address
DateRange
Coordinates
```

depending on the domain.

Value Objects are useful when a concept has meaning and rules of its own but does not require an identity.

---

# Aggregate

An Aggregate groups related domain objects that should be treated as a consistency boundary.

For example:

```text
Cart
├── CartItem
├── CartItem
└── CartItem
```

The `Cart` may act as the Aggregate Root.

Instead of allowing arbitrary code to modify individual cart items:

```text
CartItem.quantity = -500
```

changes should go through the rules owned by the Cart:

```ts
cart.updateQuantity(...)
```

The aggregate protects its invariants.

This concept becomes more relevant as business rules become more complex.

---

# Repository

A Repository provides access to domain data without requiring callers to understand the underlying persistence or external provider.

For example:

```ts
loadProductBySlug(slug)
```

The caller does not need to know whether the data comes from:

```text
Shopify
Sanity
Crystallize
PostgreSQL
REST
GraphQL
```

Conceptually:

```text
Application
    ↓
Product Repository
    ↓
Infrastructure
    ↓
External provider
```

In our boilerplate this is one of the DDD concepts we use heavily.

---

# Application layer

The application layer represents **use cases**.

For example:

```text
addProductToCart
placeOrder
loadProductPage
applyDiscount
```

It coordinates domain behavior and repositories.

Conceptually:

```text
UI
 ↓
Application
 ↓
Domain / Repository
 ↓
Infrastructure
```

Application logic describes what the system should do.

Infrastructure describes how external systems are accessed.

---

# Infrastructure

Infrastructure contains technical integrations.

Examples:

```text
Shopify
Sanity
Crystallize
Supabase
Meilisearch
Stripe
external APIs
```

Infrastructure answers:

> How do we communicate with this system?

It should not become the place where business rules live.

For example:

```text
infrastructure/
├── cms/
│   └── sanity/
├── commerce/
│   └── shopify/
└── search/
    └── meilisearch/
```

---

# Dependency direction

A useful simplified model is:

```text
UI
 ↓
Application
 ↓
Domain
 ↓
Repository
 ↓
Infrastructure
 ↓
External systems
```

Real implementations may differ, and strict DDD does not prescribe this exact frontend folder structure.

The important principle is that the core domain should avoid becoming unnecessarily coupled to external technology.

---

# Pragmatic frontend DDD

Frontend applications often do not need the full tactical DDD toolkit.

A practical implementation might simply use:

```text
domains/
├── product/
│   ├── application/
│   ├── repository/
│   ├── dto/
│   └── schema/
│
├── cart/
└── customer/
```

with:

```text
infrastructure/
├── commerce/
│   └── shopify/
└── cms/
    └── sanity/
```

This gives us useful boundaries without forcing every domain to contain Entities, Aggregates, Value Objects and Domain Services.

Introduce those concepts when the domain actually requires them.

---

# Example

Our `page` reference domain demonstrates a small version of this architecture:

```text
domains/
└── page/
    ├── application/
    ├── dto/
    ├── repository/
    └── schema/
```

connected to:

```text
infrastructure/
└── cms/
    └── sanity/
```

The flow is:

```text
Next.js
   ↓
Application
   ↓
Repository
   ↓
Sanity infrastructure
   ↓
Sanity
```

with DTO and schema validation protecting the data boundary.

See:

```text
domains/page/README.md
```

for the complete implementation.

---

# When DDD becomes useful

DDD becomes particularly interesting when the application contains meaningful business concepts and rules.

Signals include:

```text
Many business rules
Complex workflows
Multiple related models
Different contexts using the same concepts differently
External providers that should not define the application model
Business terminology that needs to be reflected clearly in code
```

For example, a commerce platform involving:

```text
Product
Pricing
Inventory
Cart
Customer
Checkout
Orders
Promotions
```

may benefit significantly from domain boundaries.

---

# When DDD may be unnecessary

DDD is not automatically better architecture.

A small website containing:

```text
Home
About
Projects
Contact
```

and fetching simple content from a CMS may not need:

```text
domains/
repositories/
application/
aggregates/
value-objects/
```

A simpler structure may be easier to understand and maintain.

The complexity of the **domain**, not simply the number of files or the chosen technology, should influence the decision.

---

# DDD and frontend architecture

DDD primarily helps us reason about the **business domain**.

It does not necessarily solve every frontend organization problem.

Modern frontends also contain concerns such as:

```text
user interactions
features
shared UI
page composition
animations
forms
client state
```

Other approaches, such as **Feature-Sliced Design (FSD)**, focus more directly on organizing those frontend concerns.

This is why DDD and FSD should not immediately be treated as mutually exclusive.

A future architecture could potentially combine:

```text
Domain concepts
+
Feature-oriented frontend organization
```

We will explore that separately.

---

# Principle

Do not start with DDD because the project should "look professional".

Start with the problem.

If explicit domain boundaries make the business logic easier to understand, evolve and protect, DDD can provide significant value.

If those boundaries only create folders and indirection, keep the architecture simpler.
