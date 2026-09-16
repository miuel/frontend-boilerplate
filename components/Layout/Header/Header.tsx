import Link from 'next/link'

import { IconMenu } from '@/components/Icon'
import styles from './Header.module.scss'

export type NavigationItem = {
  label: string
  href: string
}

export type HeaderProps = {
  navigation?: NavigationItem[]
}

export const Header = ({ navigation = [] }: HeaderProps) => {
  return (
    <header className={styles.root}>
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
        </nav>

        <button
          type="button"
          className={styles.menuButton}
          aria-label="Open menu"
        >
          <IconMenu aria-hidden="true" />
        </button>
      </div>
    </header>
  )
}
