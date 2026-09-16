# Button

Reusable button component with support for variants, sizes, themes, and polymorphic rendering.

## Usage

```tsx
<Button>Continue</Button>

<Button variant="secondary">
  Cancel
</Button>

<Button size="lg">
  Add to cart
</Button>
```

## Button Link

Use `ButtonLink` when the action represents navigation:

```tsx
<ButtonLink href="/products">
  View products
</ButtonLink>
```

This renders a Next.js `Link` while keeping the same visual styles as the button.

Use:

* `Button` for actions.
* `ButtonLink` for navigation.

## Variants

```tsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="link">Link</Button>
<Button variant="bare">Bare</Button>
```

Available variants:

```text
primary
secondary
link
bare
```

## Sizes

```tsx
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

## Tone

The `tone` prop allows the component to adapt to different backgrounds.

```tsx
<Button tone="light">
  Light background
</Button>

<Button tone="dark">
  Dark background
</Button>
```

The actual colors should be defined using the project's design tokens.

## Polymorphic Rendering

`Button` supports the `as` prop:

```tsx
<Button as="span">
  Custom element
</Button>
```

The component automatically inherits the props of the selected HTML element through `ComponentPropsWithoutRef`.

Prefer semantic elements whenever possible.

## Disabled State

```tsx
<Button disabled>
  Continue
</Button>
```

The component uses both:

```text
disabled
aria-disabled
```

`ButtonLink` uses `aria-disabled` because anchors do not support the native `disabled` attribute.

## Styling

Component-specific styles live in:

```text
Button.module.scss
```

Shared design tokens such as colors, spacing, radius, and breakpoints should come from the global style system rather than being defined inside the component.
