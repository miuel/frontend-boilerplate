# Flex

Reusable flex layout primitive based on a 12-column system.

Useful for building responsive layouts without repeating flex and width styles throughout the application.

## Structure

```tsx
<Flex.Root>
  <Flex.Item basis={6}>
    Left
  </Flex.Item>

  <Flex.Item basis={6}>
    Right
  </Flex.Item>
</Flex.Root>
```

`Flex.Root` creates the flex container.

`Flex.Item` controls how much space each child occupies.

## 12-column system

The layout uses a scale from `1` to `12`.

```text
12 = full width
6  = half width
4  = one third
3  = one quarter
```

Example:

```tsx
<Flex.Root>
  <Flex.Item basis={4}>
    Column 1
  </Flex.Item>

  <Flex.Item basis={4}>
    Column 2
  </Flex.Item>

  <Flex.Item basis={4}>
    Column 3
  </Flex.Item>
</Flex.Root>
```

## Responsive basis

A different basis can be defined for mobile and desktop.

```tsx
<Flex.Root wrap>
  <Flex.Item basis={{ init: 12, md: 6 }}>
    Left
  </Flex.Item>

  <Flex.Item basis={{ init: 12, md: 6 }}>
    Right
  </Flex.Item>
</Flex.Root>
```

This results in:

```text
Mobile
────────────
12
12

Desktop
────────────
6  |  6
```

Another common example:

```tsx
<Flex.Root wrap>
  <Flex.Item basis={{ init: 12, md: 4 }}>
    One
  </Flex.Item>

  <Flex.Item basis={{ init: 12, md: 4 }}>
    Two
  </Flex.Item>

  <Flex.Item basis={{ init: 12, md: 4 }}>
    Three
  </Flex.Item>
</Flex.Root>
```

The items stack on mobile and become three columns from the `md` breakpoint.

## Wrap

Enable wrapping when items may exceed the available width:

```tsx
<Flex.Root wrap>
  ...
</Flex.Root>
```

This adds:

```css
flex-wrap: wrap;
```

## Semantic root

The root element can be changed using `as`.

```tsx
<Flex.Root as="section">
  ...
</Flex.Root>
```

```tsx
<Flex.Root as="nav">
  ...
</Flex.Root>
```

The default element is `div`.

## Gap

The component defines its gap through:

```scss
--flex-gap
```

The default implementation uses:

```text
Mobile:  4px
Desktop: 12px
```

These values can be adapted to the design system of each project.

## Breakpoints

Responsive basis currently supports the `md` breakpoint:

```tsx
basis={{
  init: 12,
  md: 6,
}}
```

The breakpoint comes from the shared:

```text
styles/breakpoints.scss
```

Additional responsive targets can be added later if a project requires them.
