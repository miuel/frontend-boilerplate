import clsx from 'clsx'
import { ElementType } from 'react'

import { responsiveSizeClasses, TypographyBaseProps } from './utils'
import styles from './Text.module.scss'

export type TextSize = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs' | 'xxs'

export type TextProps<T extends ElementType> = TypographyBaseProps<T, TextSize>

export const Text = <T extends ElementType = 'div'>({
  as,
  children,
  color,
  weight = 'light',
  size = 'sm',
  align = 'left',
  uppercase,
  className,
  ...rest
}: TextProps<T>) => {
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
