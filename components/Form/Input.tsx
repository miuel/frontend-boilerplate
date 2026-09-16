import { forwardRef } from 'react'
import clsx from 'clsx'

import { Text } from '@/components/Typography'
import styles from './Input.module.scss'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string | boolean
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      required,
      iconLeft,
      iconRight,
      className,
      id,
      ...rest
    },
    ref
  ) => {
    const hasError = !!error

    return (
      <div className={clsx(styles.root, hasError && styles.error, className)}>
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}

        <div className={styles.inputWrapper}>
          {iconLeft && (
            <span className={styles.icon} aria-hidden="true">
              {iconLeft}
            </span>
          )}

          <input
            ref={ref}
            id={id}
            className={styles.input}
            required={required}
            aria-invalid={hasError}
            {...rest}
          />

          {iconRight && (
            <span className={styles.icon} aria-hidden="true">
              {iconRight}
            </span>
          )}
        </div>

        {typeof error === 'string' && error && (
          <Text
            as="span"
            size="xs"
            className={styles.errorText}
          >
            {error}
          </Text>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export type TextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: string
    error?: string | boolean
  }

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, required, className, id, ...rest }, ref) => {
    const hasError = !!error

    return (
      <div className={clsx(styles.root, hasError && styles.error, className)}>
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}

        <div className={styles.inputWrapper}>
          <textarea
            ref={ref}
            id={id}
            className={clsx(styles.input, styles.textarea)}
            required={required}
            aria-invalid={hasError}
            {...rest}
          />
        </div>

        {typeof error === 'string' && error && (
          <Text
            as="span"
            size="xs"
            className={styles.errorText}
          >
            {error}
          </Text>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
