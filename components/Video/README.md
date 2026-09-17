# Video

Reusable video component built on top of the native HTML `<video>` element.

The base component intentionally has no dependency on Crystallize, Shaka Player or another video provider.

## Usage

```tsx
<Video
  src="/videos/hero.mp4"
  autoPlay
  muted
  loop
  playsInline
/>
```

## Poster

Use the native `poster` attribute:

```tsx
<Video
  src="/videos/hero.mp4"
  poster="/images/hero.jpg"
/>
```

## Aspect ratio

The default aspect ratio is `16 / 9`.

```tsx
<Video
  src="/videos/product.mp4"
  aspectRatio="4 / 5"
/>
```

This makes the component useful for both landscape and portrait video.

## Custom controls

Simple play/pause and progress controls can be enabled with:

```tsx
<Video
  src="/videos/hero.mp4"
  showCustomControls
/>
```

For regular browser controls, use the native `controls` prop instead:

```tsx
<Video
  src="/videos/hero.mp4"
  controls
/>
```

## Native video props

`Video` extends the native HTML video props, so standard attributes can be used:

```text
autoPlay
muted
loop
controls
playsInline
preload
poster
```

## Architecture

The component should remain independent from the CMS or video provider.

```text
Video
    ↓
HTML <video>
```

Provider-specific integrations should live outside the base component.

For example:

```text
infrastructure/
└── video/
    └── shaka/
```

or:

```text
infrastructure/
└── cms/
    └── crystallize/
```

## HLS / Shaka

Shaka Player is intentionally not included in the base component.

If a project requires HLS (`.m3u8`) streaming, Shaka or another HLS integration can be added separately without coupling the generic `Video` component to that implementation.
