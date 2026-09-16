import { forwardRef } from 'react'
import clsx from 'clsx'

import { Text } from '@/components/Typography'
import styles from './Radio.module.scss'

export type RadioProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> & {
  label: React.ReactNode
  error?: string | boolean
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, error, className, ...rest }, ref) => {
    const hasError = !!error

    return (
      <label
        className={clsx(
          styles.root,
          hasError && styles.error,
          rest.disabled && styles.disabled,
          className
        )}
      >
        <input
          ref={ref}
          type="radio"
          className={styles.radio}
          aria-invalid={hasError}
          {...rest}
        />

        <span className={styles.circle} aria-hidden="true">
          <span className={styles.dot} />
        </span>

        <Text as="span" size="xs">
          {label}
        </Text>
      </label>
    )
  }
)

Radio.displayName = 'Radio'
