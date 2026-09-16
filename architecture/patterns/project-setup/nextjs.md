# Next.js Project Setup

Standard setup and conventions for starting a new Next.js project.

The goal is to keep the initial setup simple, predictable, and easy to extend as the project grows.

---

## Create the Project

Start with the official Next.js CLI:

```bash
npx create-next-app@latest
```

Recommended options:

```text
TypeScript             → Yes
ESLint                 → Yes
React Compiler         → No
Tailwind CSS           → No
src/ directory         → No
App Router             → Yes
Import alias @/*       → Yes (default)
```

These are defaults, not strict requirements. They can change depending on the project.

---

## Initial Structure

Keep the initial structure minimal:

```text
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.scss
│
├── domains/
├── infrastructure/
├── ui/
│   ├── assets/
│   ├── components/
│   ├── features/
│   ├── hooks/
│   ├── styles/
│   └── utils/
│
├── public/
│
├── next.config.ts
├── package.json
├── tsconfig.json
├── eslint.config.mjs
└── .prettierrc
```

For a detailed explanation of the architecture, see:

```text
architecture/domain-driven-frontend.md
```

---

## Styling

Use **SASS / SCSS** as the default styling solution.

Install:

```bash
npm install sass
```

Global styles can live in:

```text
app/globals.scss
```

Shared styling infrastructure can live in:

```text
ui/styles/
├── variables.scss
├── mixins.scss
└── breakpoints.scss
```

Component-specific styles should stay close to the component:

```text
Button/
├── Button.tsx
└── Button.module.scss
```

---

## Import Alias

Use the default `@/*` alias:

```ts
import { Button } from '@/ui/components/Button'
```

Instead of long relative imports:

```ts
import { Button } from '../../../ui/components/Button'
```

The alias is configured in `tsconfig.json`.

---

## Server Components by Default

With the App Router, components should remain Server Components unless they require client-side functionality.

Only add:

```ts
'use client'
```

when the component needs things such as:

* React state
* effects
* browser APIs
* event handlers
* client-side hooks

Avoid adding `'use client'` at high levels of the component tree unnecessarily.

---

## Environment Variables

Store local environment variables in:

```text
.env.local
```

Never commit secrets or credentials.

Variables exposed to the browser must use the:

```text
NEXT_PUBLIC_
```

prefix.

Server-only secrets should never use this prefix.

---

## General Principles

* Start with the smallest structure necessary.
* Keep business logic outside UI components.
* Prefer Server Components unless client-side interactivity is required.
* Keep components and logic close to where they are used.
* Avoid introducing dependencies until there is a real use case.
* Keep external services behind the infrastructure layer.
* Promote code to shared folders only when it is genuinely reused.

The project structure should evolve with the application rather than trying to predict every future requirement.
