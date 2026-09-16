'use client'

import { useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'

import styles from './Drawer.module.scss'

// import { useScrollLock } from '@/hooks/useScrollLock'

const noop = () => () => {}

const useIsMounted = () =>
  useSyncExternalStore(
    noop,
    () => true,
    () => false
  )

export type DrawerProps = {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  size?: 'regular' | 'large'
}

export const Drawer = ({
  children,
  isOpen,
  onClose,
  size = 'regular',
}: DrawerProps) => {
  const isMounted = useIsMounted()

  // Optional:
  // Prevents the page behind the drawer from scrolling.
  // useScrollLock(isOpen)

  if (!isMounted) {
    return null
  }

  return createPortal(
    <>
      <div
        className={clsx(styles.backdrop, isOpen && styles.active)}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={clsx(
          styles.drawer,
          styles[size],
          isOpen && styles.active
        )}
      >
        {isOpen ? children : null}
      </div>
    </>,
    document.body
  )
}
