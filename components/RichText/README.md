# RichText

Reusable component for rendering structured rich-text JSON as semantic HTML.

The implementation is separated into two responsibilities:

```text
RichText
   ↓
Typography / Text
   ↓
ContentTransformer
   ↓
Semantic HTML
```

## Usage

```tsx
<RichText json={content} />
```

Typography props can also be provided:

```tsx
<RichText
  json={content}
  size="md"
  color="secondary"
/>
```

## Content Transformer

`ContentTransformer` recursively converts structured JSON nodes into React elements.

Supported content includes:

- Paragraphs
- Headings
- Links
- Ordered and unordered lists
- Quotes
- Strong and emphasized text
- Underlined and deleted text
- Subscript and superscript
- Code and preformatted blocks
- Tables
- Horizontal rules
- Line breaks

## Links

Internal links use Next.js `Link`.

```text
/products
/about
/contact
```

External links use regular anchors and open in a new tab.

## Overrides

Individual renderers can be replaced when a project requires custom behavior.

```tsx
<ContentTransformer
  json={content}
  overrides={{
    link: props => (
      <CustomLink {...props} />
    ),
  }}
/>
```

This allows the transformer to remain generic while supporting project-specific requirements.

## Styling

Rich-text presentation is handled by:

```text
RichText.module.scss
```

It provides default styles for:

```text
p
h1-h6
ul / ol / li
a
blockquote
table
th / td
code / pre
hr
strong
sub / sup
images / video
```

The styles use the shared design tokens from `styles/globals.scss`.

## Architecture

`ContentTransformer` should only be responsible for transforming content into semantic HTML.

`RichText` is responsible for presentation and typography.

This keeps the content transformation logic independent from the visual design of a specific project.
