import clsx from 'clsx'
import { ElementType } from 'react'

import { responsiveSizeClasses, TypographyBaseProps } from './utils'
import styles from './Heading.module.scss'

export type HeadingSize = 'xl' | 'lg' | 'md' | 'sm' | 'xs'

export type HeadingProps<T extends ElementType> = TypographyBaseProps<
  T,
  HeadingSize
>

export const Heading = <T extends ElementType = 'h2'>({
  as,
  children,
  color,
  weight = 'light',
  size = 'lg',
  align = 'left',
  uppercase,
  className,
  ...rest
}: HeadingProps<T>) => {
  const Component = as || 'h2'

  return (
    <Component
      className={clsx(
        styles.root,
        styles[weight],
        responsiveSizeClasses(size, styles),
        color && styles[color],
        styles[align],
        uppercase && styles.uppercase,
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  )
}
