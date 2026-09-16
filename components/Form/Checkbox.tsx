import { forwardRef } from 'react'
import clsx from 'clsx'

import styles from './Checkbox.module.scss'

export type CheckboxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> & {
  label: string
  error?: string | boolean
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
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
          type="checkbox"
          className={styles.checkbox}
          aria-invalid={hasError}
          {...rest}
        />

        <span className={styles.box} aria-hidden="true">
          <svg
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.4167 0.75L4.39583 8.77083L0.75 5.125"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        <span className={styles.label}>{label}</span>
      </label>
    )
  }
)

Checkbox.displayName = 'Checkbox'
