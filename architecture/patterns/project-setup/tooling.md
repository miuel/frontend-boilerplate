# Project Tooling

Standard tooling used across frontend projects.

## TypeScript

Use TypeScript with strict type checking enabled.

Prefer:

* Explicit types at application boundaries.
* Types derived from schemas when possible.
* Avoid `any`.
* Let TypeScript infer types when they are obvious.

Configuration lives in:

```text
tsconfig.json
```

---

## ESLint

Use ESLint for code quality and identifying potential problems.

For Next.js projects, start with the official Next.js ESLint configuration and extend it only when necessary.

```text
eslint.config.mjs
```

Avoid adding rules simply for stylistic preferences when Prettier can handle them.

---

## Prettier

Use Prettier for consistent code formatting.

Example `.prettierrc`:

```json
{
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": false,
  "singleQuote": true,
  "arrowParens": "avoid",
  "printWidth": 90
}
```

Enable **Format on Save** in the editor when possible.

ESLint should handle code quality; Prettier should handle formatting.

---

## SASS

Use SASS/SCSS with CSS Modules for component styling.

```bash
npm install sass
```

Component styles should stay close to their component:

```text
Button/
├── Button.tsx
└── Button.module.scss
```

Shared styles belong in:

```text
ui/styles/
├── variables.scss
├── mixins.scss
└── breakpoints.scss
```

Prefer CSS custom properties for values that need to be available or changed at runtime.

---

## Principle

Keep tooling simple.

Add configuration, dependencies, and rules when they solve an actual problem — not because they might be useful someday.
