import clsx from 'clsx'
import Link, { LinkProps } from 'next/link'
import {
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
} from 'react'

import styles from './Button.module.scss'

export type ButtonProps<T extends ElementType> =
  ComponentPropsWithoutRef<T> & {
    as?: T
    variant?: 'primary' | 'secondary' | 'link' | 'bare'
    size?: 'md' | 'lg'
    tone?: 'light' | 'dark'
    className?: string
    children?: ReactNode
    disabled?: boolean
  }

export const Button = <T extends ElementType = 'button'>({
  as,
  variant = 'primary',
  size = 'md',
  tone = 'light',
  className,
  children,
  disabled,
  ...rest
}: ButtonProps<T>) => {
  const Component = as || 'button'

  return (
    <Component
      className={clsx(
        styles.root,
        styles[variant],
        styles[size],
        styles[tone],
        className
      )}
      disabled={disabled}
      aria-disabled={disabled}
      {...rest}
    >
      {children}
    </Component>
  )
}

type ButtonLinkProps = LinkProps &
  Omit<ButtonProps<'a'>, 'as'> & {
    href: string
  }

export const ButtonLink = ({
  href,
  variant = 'primary',
  size = 'md',
  tone = 'light',
  className,
  children,
  disabled,
  ...rest
}: ButtonLinkProps) => (
  <Link
    href={href}
    className={clsx(
      styles.root,
      styles[variant],
      styles[size],
      styles[tone],
      className
    )}
    aria-disabled={disabled}
    {...rest}
  >
    {children}
  </Link>
)
