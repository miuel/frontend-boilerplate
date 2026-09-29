import NextImage from 'next/image'

type ImageProps = {
  src: string
  alt: string
  width: number
  height: number
  sizes?: string
  priority?: boolean
}

export const Image = ({
  src,
  alt,
  width,
  height,
  sizes,
  priority = false,
}: ImageProps) => {
  return (
    <NextImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
    />
  )
}
