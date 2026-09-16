# Form

Reusable form components built on top of native HTML controls where possible.

## Components

- `Input`
- `Textarea`
- `Checkbox`
- `Radio`
- `Select`
- `SelectItem`

The components share the global typography, spacing, colors and form states defined by the project's design system.

---

## Input

Standard input with support for labels, validation errors, required state and optional icons.

```tsx
<Input
  id="email"
  name="email"
  type="email"
  label="Email"
  placeholder="you@example.com"
  required
/>
```

With validation:

```tsx
<Input
  id="email"
  label="Email"
  error="Please enter a valid email address."
/>
```

Icons can be rendered on either side:

```tsx
<Input
  iconLeft={<IconSearch />}
  placeholder="Search..."
/>
```

---

## Textarea

Uses the same visual structure and validation pattern as `Input`.

```tsx
<Textarea
  id="message"
  name="message"
  label="Message"
  placeholder="Write your message..."
  required
/>
```

---

## Checkbox

Built on top of the native checkbox input.

```tsx
<Checkbox
  name="terms"
  label="I accept the terms and conditions"
  required
/>
```

It supports the standard native input props, including:

```text
checked
defaultChecked
disabled
required
onChange
```

---

## Radio

Built on top of the native radio input.

```tsx
<Radio
  name="delivery"
  value="standard"
  label="Standard delivery"
/>

<Radio
  name="delivery"
  value="express"
  label="Express delivery"
/>
```

Radio buttons that belong to the same group should share the same `name`.

---

## Select

`Select` uses Radix UI Select instead of the native `<select>` element.

```tsx
<Select
  name="country"
  label="Country"
  placeholder="Select country"
>
  <SelectItem value="se">Sweden</SelectItem>
  <SelectItem value="ar">Argentina</SelectItem>
</Select>
```

It supports:

```text
label
placeholder
required
error
disabled
value
defaultValue
onValueChange
```

---

## Dependencies

The `Select` component requires Radix UI Select:

```bash
npm install @radix-ui/react-select
```

The components also use:

```bash
npm install clsx
```

`Input`, `Textarea`, `Checkbox` and `Radio` do not require Radix.

---

## Form integration

`Input`, `Textarea`, `Checkbox` and `Radio` use native HTML form controls.

`Select` uses Radix UI and includes a hidden native input when a `name` is provided, allowing the selected value to participate in regular form submissions.

```tsx
<form>
  <Input
    name="email"
    type="email"
    label="Email"
  />

  <Select
    name="country"
    label="Country"
  >
    <SelectItem value="se">Sweden</SelectItem>
    <SelectItem value="ar">Argentina</SelectItem>
  </Select>
</form>
```

---

## Accessibility

Keep labels connected to their corresponding fields and provide meaningful validation messages.

Use `id` when rendering an `Input` or `Textarea` with a label:

```tsx
<Input
  id="firstName"
  name="firstName"
  label="First name"
/>
```

Error states use `aria-invalid` to communicate invalid fields to assistive technologies.

Radix UI handles keyboard navigation and focus behavior for `Select`.

---

## Project dependencies

These components expect the shared project foundations to exist:

```text
components/
├── Icon/
└── Typography/

styles/
├── globals.scss
├── spacing.scss
└── breakpoints.scss
```

Design tokens such as the following are expected to be available:

```scss
var(--font-body)
var(--gap-*)
var(--radius-*)
var(--color-neutral-*)
var(--color-error-*)
```
