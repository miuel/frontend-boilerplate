import Link from 'next/link'

import { Text } from '@/components/Typography'
import styles from './Footer.module.scss'

export type FooterLink = {
  label: string
  href: string
}

export type FooterColumn = {
  title: string
  links: FooterLink[]
}

export type FooterProps = {
  columns: FooterColumn[]
}

export const Footer = ({ columns }: FooterProps) => {
  return (
    <footer className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logo} aria-label="Home">
            Logo
          </Link>
        </div>

        <div className={styles.columns}>
          {columns.map(column => (
            <FooterLinksSection key={column.title} column={column} />
          ))}
        </div>
      </div>
    </footer>
  )
}

type FooterLinksSectionProps = {
  column: FooterColumn
}

const FooterLinksSection = ({ column }: FooterLinksSectionProps) => {
  const { title, links } = column

  return (
    <div className={styles.column}>
      <Text
        as="span"
        size="xs"
        weight="medium"
        className={styles.columnTitle}
      >
        {title}
      </Text>

      <ul className={styles.list}>
        {links.map(link => (
          <li key={`${link.label}-${link.href}`}>
            <FooterLink link={link} />
          </li>
        ))}
      </ul>
    </div>
  )
}

type FooterLinkProps = {
  link: FooterLink
}

const FooterLink = ({ link }: FooterLinkProps) => {
  const { label, href } = link

  const isEmail = href.startsWith('mailto:')
  const isPhone = href.startsWith('tel:')
  const isExternal =
    href.startsWith('http://') || href.startsWith('https://')

  if (isEmail || isPhone || isExternal) {
    return (
      <a
        href={href}
        className={styles.link}
        {...(isExternal && {
          target: '_blank',
          rel: 'noopener noreferrer',
        })}
      >
        {label}
      </a>
    )
  }

  return (
    <Link href={href} className={styles.link}>
      {label}
    </Link>
  )
}
