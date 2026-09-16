# UI Components

Reusable and domain-agnostic UI components that can be used across different features and projects.

## Principles

* No business logic.
* Accessibility should be built in.
* Keep APIs simple and composable.
* Keep styles close to the component.
* Avoid dependencies on specific domains or services.
* Only make a component global when it is genuinely reusable.

## Component Structure

A typical component can follow:

```text
Button/
├── Button.tsx
├── Button.module.scss

```

Additional files such as tests or Storybook stories can be added when needed.

## Components

This collection can include:

```text
Button/
Text/
Link/
Image/
Icon/
Input/
Modal/
RichText/
```

More complex components should include their own `README.md` explaining their purpose, API, decisions, and usage.
