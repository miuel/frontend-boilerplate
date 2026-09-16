'use client'

import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import Link from 'next/link'

import { IconClose, IconMenu, IconSearch } from '@/components/Icon'
import styles from './Header.module.scss'

export type NavigationItem = {
  label: string
  href: string
}

type HeaderOverlay = 'desktop-menu' | 'mobile-menu' | 'search' | 'cart' | null

export type HeaderProps = {
  navigation?: NavigationItem[]
}

export const Header = ({ navigation = [] }: HeaderProps) => {
  const [activeOverlay, setActiveOverlay] = useState<HeaderOverlay>(null)
  const [isSticky, setIsSticky] = useState(false)

  const desktopMenuRef = useRef<HTMLDivElement | null>(null)
  const desktopTriggerRef = useRef<HTMLButtonElement | null>(null)

  const isDesktopMenuOpen = activeOverlay === 'desktop-menu'
  const isMobileMenuOpen = activeOverlay === 'mobile-menu'
  const isSearchOpen = activeOverlay === 'search'
  const isCartOpen = activeOverlay === 'cart'

  const toggleOverlay = (overlay: Exclude<HeaderOverlay, null>) => {
    setActiveOverlay(current => (current === overlay ? null : overlay))
  }

  const closeOverlay = () => {
    setActiveOverlay(null)
  }

  // Sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Close desktop menu when clicking outside
  useEffect(() => {
    if (!isDesktopMenuOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node

      const clickedInsideMenu = desktopMenuRef.current?.contains(target)
      const clickedTrigger = desktopTriggerRef.current?.contains(target)

      if (!clickedInsideMenu && !clickedTrigger) {
        closeOverlay()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDesktopMenuOpen])

  return (
    <>
      <header className={clsx(styles.root, isSticky && styles.sticky)}>
        <div className={styles.inner}>
          <Link href="/" className={styles.logo} aria-label="Home">
            Logo
          </Link>

          <nav className={styles.navigation} aria-label="Main navigation">
            {navigation.map(item => (
              <Link key={item.href} href={item.href} className={styles.link}>
                {item.label}
              </Link>
            ))}

            <button
              ref={desktopTriggerRef}
              type="button"
              className={styles.link}
              aria-expanded={isDesktopMenuOpen}
              onClick={() => toggleOverlay('desktop-menu')}
            >
              More
            </button>
          </nav>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.action}
              aria-label="Search"
              aria-expanded={isSearchOpen}
              onClick={() => toggleOverlay('search')}
            >
              <IconSearch aria-hidden="true" />
            </button>

            <button
              type="button"
              className={styles.action}
              aria-label="Cart"
              aria-expanded={isCartOpen}
              onClick={() => toggleOverlay('cart')}
            >
              Cart
            </button>

            <button
              type="button"
              className={clsx(styles.action, styles.menuTrigger)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              onClick={() => toggleOverlay('mobile-menu')}
            >
              {isMobileMenuOpen ? (
                <IconClose aria-hidden="true" />
              ) : (
                <IconMenu aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {isDesktopMenuOpen && (
        <div ref={desktopMenuRef} className={styles.overlay}>
          Desktop menu
        </div>
      )}

      {isMobileMenuOpen && (
        <div className={styles.overlay}>
          Mobile menu
        </div>
      )}

      {isSearchOpen && (
        <div className={styles.overlay}>
          Search
        </div>
      )}

      {isCartOpen && (
        <div className={styles.overlay}>
          Cart
        </div>
      )}
    </>
  )
}
