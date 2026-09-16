import { useId } from 'react'

export type IconProps = React.ComponentPropsWithoutRef<'svg'>

export const IconArrowRight = (props: IconProps) => {
  const id = useId()

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath={`url(#${id})`}>
        <path
          d="M2 11.9998L21.5711 11.9998M21.5711 11.9998C21.5711 11.9998 19.4599 10.4114 18.4485 8.86683C17.437 7.32223 17.0291 6.43004 17.0291 6.43004M21.5711 11.9998C21.5711 11.9998 19.5181 13.6597 18.4485 15.1329C17.3788 16.606 17.0291 17.5697 17.0291 17.5697"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      <defs>
        <clipPath id={id}>
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export const IconPlus = (props: IconProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 5V19M5 12H19"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const IconMinus = (props: IconProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5 12H19"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const IconChevronDown = (props: IconProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6 9L12 15L18 9"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const IconChevronUp = (props: IconProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6 15L12 9L18 15"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const IconClose = (props: IconProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M18 6L6 18M6 6L18 18"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const IconSearch = (props: IconProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M21 21L15 15M3 10C3 6.13 6.13 3 10 3C13.87 3 17 6.13 17 10C17 13.87 13.87 17 10 17C6.13 17 3 13.87 3 10Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const IconMenu = (props: IconProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1 9H23M5.13 15H23"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const IconLoader = (props: IconProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M12 3a9 9 0 1 0 9 9" />
  </svg>
)
