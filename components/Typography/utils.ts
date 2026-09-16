import { ComponentPropsWithRef, ElementType, ReactNode } from 'react'

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type ResponsiveSize<T extends string> = {
  init: T
} & Partial<Record<Breakpoint, T>>

export type TypographyBaseProps<
  T extends ElementType,
  Size extends string,
> = ComponentPropsWithRef<T> & {
  as?: T
  children?: ReactNode
  color?: 'primary' | 'secondary' | 'white'
  weight?: 'light' | 'regular' | 'medium'
  size?: Size | ResponsiveSize<Size>
  align?: 'left' | 'center' | 'right'
  uppercase?: boolean
}

export function responsiveSizeClasses<T extends string>(
  size: T | ResponsiveSize<T>,
  styles: Record<string, string>
) {
  if (typeof size === 'string') {
    return styles[size]
  }

  return [
    styles[`r-${size.init}`],
    size.xs && styles[`at-xs-${size.xs}`],
    size.sm && styles[`at-sm-${size.sm}`],
    size.md && styles[`at-md-${size.md}`],
    size.lg && styles[`at-lg-${size.lg}`],
    size.xl && styles[`at-xl-${size.xl}`],
  ]
}
