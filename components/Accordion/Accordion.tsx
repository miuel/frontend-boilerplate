'use client'

import * as AccordionPrimitive from '@radix-ui/react-accordion'
import clsx from 'clsx'
import { ReactNode } from 'react'

import { IconArrowDownRight } from '@/ui/components/icon'

import styles from './Accordion.module.scss'

type AccordionRootProps = {
  children: ReactNode
  rootClassName?: string
  openValues?: string[]
}

type AccordionItemProps = {
  value: string
  children: ReactNode
  header?: ReactNode
  itemClassName?: string
  triggerClassName?: string
  contentClassName?: string
  headerInnerClassName?: string
  iconWrapperClassName?: string
  iconClassName?: string
}

export const AccordionRoot = ({
  children,
  openValues,
  rootClassName,
}: AccordionRootProps) => {
  return (
    <AccordionPrimitive.Root
      type="multiple"
      defaultValue={openValues}
      className={clsx(styles.root, rootClassName)}
    >
      {children}
    </AccordionPrimitive.Root>
  )
}
export const AccordionItem = ({
  value,
  children,
  header,
  itemClassName,
  triggerClassName,
  contentClassName,
  headerInnerClassName,
  iconWrapperClassName,
  iconClassName,
}: AccordionItemProps) => {
  return (
    <AccordionPrimitive.Item value={value} className={clsx(styles.item, itemClassName)}>
      <AccordionPrimitive.Header className={styles.header}>
        <AccordionPrimitive.Trigger className={clsx(styles.trigger, triggerClassName)}>
          <div className={clsx(styles.headerInner, headerInnerClassName)}>{header}</div>

          <span className={clsx(styles.iconWrapper, iconWrapperClassName)}>
            <IconArrowDownRight className={clsx(styles.arrow, iconClassName)} />
          </span>
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>

      <AccordionPrimitive.Content className={clsx(styles.content, contentClassName)}>
        <div className={styles.contentInner}>{children}</div>
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  )
}
