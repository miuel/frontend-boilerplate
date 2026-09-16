import clsx from 'clsx'
import { ElementType } from 'react'

import { responsiveSizeClasses, TypographyBaseProps } from './utils'
import styles from './Subheading.module.scss'

export type SubheadingSize = 'lg' | 'md' | 'sm' | 'xs'

export type SubheadingProps<T extends ElementType> = TypographyBaseProps<
  T,
  SubheadingSize
>

export const Subheading = <T extends ElementType = 'div'>({
  as,
  children,
  color,
  weight = 'regular',
  size = 'md',
  align = 'left',
  uppercase,
  className,
  ...rest
}: SubheadingProps<T>) => {
  const Component = as || 'div'

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
