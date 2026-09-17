# Accordion

Reusable accessible accordion component built with Radix UI Accordion.

Useful for:

- FAQs
- Product information
- Filters
- Expandable content sections
- Mobile content navigation

## Dependency

The component uses Radix UI Accordion.

```bash
npm install @radix-ui/react-accordion
```

Radix handles the core accordion behavior, including:

- Keyboard navigation
- ARIA attributes
- Open / closed state
- Focus management
- Single or multiple expanded items

## Usage

```tsx
<Accordion type="single" collapsible>
  <AccordionItem value="shipping">
    <AccordionTrigger>
      Shipping
    </AccordionTrigger>

    <AccordionContent>
      Shipping information goes here.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="returns">
    <AccordionTrigger>
      Returns
    </AccordionTrigger>

    <AccordionContent>
      Returns information goes here.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

## Single

Only one item can be open at a time.

```tsx
<Accordion type="single" collapsible>
  ...
</Accordion>
```

## Multiple

Multiple items can remain open.

```tsx
<Accordion type="multiple">
  ...
</Accordion>
```

## Structure

```text
Accordion
└── AccordionItem
    ├── AccordionTrigger
    └── AccordionContent
```

`Accordion` controls the accordion behavior.

`AccordionItem` represents an individual section.

`AccordionTrigger` controls the open / closed state.

`AccordionContent` contains the expandable content.

## Styling

Visual styles should remain separate from the Radix behavior:

```text
Accordion/
├── Accordion.tsx
├── Accordion.module.scss
├── index.ts
└── README.md
```

Radix exposes state through attributes such as:

```css
[data-state='open']
[data-state='closed']
```

These can be used for animations and visual state changes.

## Accessibility

Prefer Radix primitives instead of manually implementing accordion behavior.

The trigger should clearly describe the content it expands.

Do not use an accordion only for visual purposes when the content does not need to be collapsible.
