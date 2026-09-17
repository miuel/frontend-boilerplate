# Infrastructure

The `infrastructure` layer contains integrations with external systems and services.

Examples include:

- CMS providers
- Databases
- External APIs
- Authentication providers
- Search engines
- Payment providers
- File storage

Infrastructure should focus on **communication with external systems**, not application or business logic.

## Structure

A project may contain infrastructure such as:

```text
infrastructure/
├── cms/
│   ├── crystallize/
│   └── sanity/
│
├── database/
│   └── supabase/
│
├── search/
│   └── meilisearch/
│
└── api/
```

Only create integrations that are actually required by the project.

---

## Responsibility

Infrastructure answers questions such as:

```text
How do we connect to Crystallize?
How do we query Sanity?
How do we connect to Supabase?
How do we authenticate requests?
How do we communicate with an external API?
```

It should **not** answer questions such as:

```text
Which products should be displayed?
Is this cart valid?
Should this user receive a discount?
How should CMS data be transformed for the UI?
```

Those responsibilities belong to higher layers.

---

## Layer direction

Our domain architecture generally follows:

```text
application
     ↓
repository
     ↓
infrastructure
     ↓
external service
```

For example:

```text
loadProductPage()
        ↓
loadProductByPath()
        ↓
crystallizeRequest()
        ↓
Crystallize API
```

### Infrastructure

Handles communication with the external service.

```ts
crystallizeRequest(...)
```

### Repository

Defines domain-specific queries.

```ts
loadProductByPath(...)
```

### Application

Combines repository operations and applies business logic.

```ts
loadProductPage(...)
```

This keeps external providers separated from application logic.

---

## CMS

CMS integrations live under:

```text
infrastructure/
└── cms/
```

For example:

```text
cms/
├── crystallize/
│   ├── client.ts
│   ├── config.ts
│   └── README.md
│
└── sanity/
    ├── client.ts
    ├── config.ts
    └── README.md
```

The exact implementation will differ between providers, but the architectural responsibility remains the same.

---

## Database

Database clients can follow the same principle:

```text
infrastructure/
└── database/
    └── supabase/
        ├── client.ts
        ├── config.ts
        └── README.md
```

Infrastructure establishes the connection.

Domain repositories decide **what data the application needs**.

---

## Environment variables

Credentials and environment-specific configuration should never be hardcoded.

For example:

```env
CRYSTALLIZE_TENANT_IDENTIFIER=
CRYSTALLIZE_ACCESS_TOKEN_ID=
CRYSTALLIZE_ACCESS_TOKEN_SECRET=

NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Commit an example file when useful:

```text
.env.example
```

Never commit real credentials.

---

## Provider-specific code

Keep provider-specific concepts inside their corresponding integration whenever possible.

For example:

```text
infrastructure/cms/crystallize/
```

may know about:

```text
Crystallize
Discovery API
Catalogue API
authentication
tenant identifiers
```

But the rest of the application should avoid depending directly on those implementation details when possible.

This makes replacing or adding providers easier later.

---

## Principle

Keep infrastructure boring.

Its job is primarily:

```text
configure
connect
request
return
```

Business decisions belong elsewhere.
