# Typography

Reusable typography system built around three components:

* `Heading` — primary display typography.
* `Subheading` — secondary typography for titles and labels.
* `Text` — general body copy.

All components share a common API and support responsive sizing.

---

## Heading

Uses the primary/title font.

```tsx
<Heading as="h1" size="xl">
  Main heading
</Heading>
```

Typically:

```scss
--font-title: var(--font-playfair), serif;
```

The `as` prop controls semantic HTML independently from visual appearance.

```tsx
<Heading as="h3" size="xl">
  Visually large, semantically H3
</Heading>
```

---

## Subheading

Uses the secondary/body font but can still render as a semantic heading.

```tsx
<Subheading as="h2" size="lg">
  Featured products
</Subheading>
```

Typically:

```scss
--font-body: var(--font-inter), sans-serif;
```

This is useful when the design requires a heading hierarchy without using the primary display typeface.

---

## Text

Used for general body copy.

```tsx
<Text as="p" size="sm">
  Product description goes here.
</Text>
```

It can render as any appropriate HTML element:

```tsx
<Text as="span">Inline text</Text>
<Text as="p">Paragraph</Text>
<Text as="div">Generic content</Text>
```

---

## Responsive Sizes

All typography components support responsive sizing.

Simple:

```tsx
<Text size="md">
  Text
</Text>
```

Responsive:

```tsx
<Text
  size={{
    init: 'sm',
    md: 'md',
    xl: 'lg',
  }}
>
  Responsive text
</Text>
```

This applies:

```text
Default → sm
md      → md
xl      → lg
```

The `responsiveSizeClasses` utility converts the configuration into generated CSS classes for each breakpoint.

---

## Shared Props

Typography components support:

```tsx
<Heading
  size="lg"
  weight="regular"
  color="primary"
  align="center"
  uppercase
>
  Example
</Heading>
```

Common options include:

* `as`
* `size`
* `weight`
* `color`
* `align`
* `uppercase`
* `className`

---

## Semantic HTML

Visual appearance and HTML semantics should remain independent.

Prefer:

```tsx
<Subheading as="h2">
  Related articles
</Subheading>
```

over choosing `Heading` simply because the content needs to be an `h2`.

The heading level should follow the document structure, while the component controls its visual style.

---

## Fonts

Typography components use global font variables:

```scss
--font-title: sans-serif;
--font-body: sans-serif;
```

Individual projects can provide their own fonts:

```scss
--font-title: var(--font-playfair), serif;
--font-body: var(--font-inter), sans-serif;
```

This keeps the typography components independent from any specific font family or brand.
