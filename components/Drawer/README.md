# Drawer

Reusable side panel rendered outside the application tree using a React Portal.

Useful for:

- Shopping carts
- Filters
- Mobile navigation
- Settings panels
- Secondary content

## Usage

```tsx
const [isOpen, setIsOpen] = useState(false)

return (
  <>
    <Button onClick={() => setIsOpen(true)}>
      Open drawer
    </Button>

    <Drawer
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <DrawerHeader
        title="Filters"
        onClose={() => setIsOpen(false)}
      />

      <DrawerContent>
        Content
      </DrawerContent>
    </Drawer>
  </>
)
```

## Sizes

```tsx
<Drawer size="regular" />

<Drawer size="large" />
```

Both use the full viewport width on smaller screens and become constrained on desktop.

## Portal

The drawer is rendered into `document.body` using:

```tsx
createPortal(content, document.body)
```

This keeps the drawer outside normal page layout and avoids common stacking and overflow issues.

## SSR

The component checks that it has mounted before creating the portal.

```tsx
const isMounted = useIsMounted()

if (!isMounted) {
  return null
}
```

This prevents access to `document.body` during server rendering.

## Scroll lock

Projects will commonly want to prevent background scrolling while the drawer is open.

A reusable `useScrollLock` hook can be enabled:

```tsx
// import { useScrollLock } from '@/hooks/useScrollLock'

// useScrollLock(isOpen)
```

It is intentionally optional in this starter.

## Structure

```text
Drawer
├── Backdrop
└── Panel
    ├── DrawerHeader
    └── DrawerContent
```

`Drawer` handles the portal, open state, backdrop and positioning.

`DrawerHeader` and `DrawerContent` handle the internal presentation.

## Dependencies

```bash
npm install clsx
```

No external dialog or drawer library is required.
