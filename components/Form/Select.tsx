'use client'

import { useRef } from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import clsx from 'clsx'

import { IconChevronDown } from '@/components/Icon'
import { Text } from '@/components/Typography'
import styles from './Select.module.scss'

export type SelectProps = {
  name?: string
  label?: string
  placeholder?: string
  required?: boolean
  error?: string | boolean
  disabled?: boolean
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
  className?: string
}

export const Select = ({
  name,
  label,
  placeholder,
  required,
  error,
  disabled,
  value,
  defaultValue,
  onValueChange,
  children,
  className,
}: SelectProps) => {
  const hasError = !!error
  const hiddenRef = useRef<HTMLInputElement>(null)

  const handleValueChange = (nextValue: string) => {
    onValueChange?.(nextValue)

    if (!hiddenRef.current) return

    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      'value'
    )?.set

    nativeInputValueSetter?.call(hiddenRef.current, nextValue)

    hiddenRef.current.dispatchEvent(
      new Event('input', { bubbles: true })
    )

    hiddenRef.current.dispatchEvent(
      new Event('change', { bubbles: true })
    )
  }

  return (
    <div
      className={clsx(
        styles.root,
        hasError && styles.error,
        className
      )}
    >
      {label && (
        <span className={styles.label}>
          {label}

          {required && (
            <span className={styles.required}>*</span>
          )}
        </span>
      )}

      <SelectPrimitive.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={handleValueChange}
        disabled={disabled}
      >
        <SelectPrimitive.Trigger
          className={styles.trigger}
          aria-invalid={hasError}
        >
          <SelectPrimitive.Value placeholder={placeholder} />

          <SelectPrimitive.Icon className={styles.icon}>
            <IconChevronDown aria-hidden="true" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className={styles.content}
            position="popper"
            sideOffset={4}
          >
            <SelectPrimitive.Viewport className={styles.viewport}>
              {children}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>

      {name && (
        <input
          ref={hiddenRef}
          type="hidden"
          name={name}
          value={value ?? defaultValue ?? ''}
        />
      )}

      {typeof error === 'string' && error && (
        <Text as="span" size="xs" className={styles.errorText}>
          {error}
        </Text>
      )}
    </div>
  )
}

export type SelectItemProps = SelectPrimitive.SelectItemProps & {
  icon?: React.ReactNode
}

export const SelectItem = ({
  children,
  icon,
  className,
  ...rest
}: SelectItemProps) => {
  return (
    <SelectPrimitive.Item
      className={clsx(styles.item, className)}
      {...rest}
    >
      {icon && (
        <span className={styles.itemIcon}>
          {icon}
        </span>
      )}

      <SelectPrimitive.ItemText>
        {children}
      </SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}
