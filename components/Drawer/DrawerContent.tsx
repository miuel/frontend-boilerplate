import { Button } from '@/components/Button'
import { IconClose } from '@/components/Icon'
import { Heading } from '@/components/Typography'

import styles from './DrawerContent.module.scss'

export type DrawerContentProps = {
  children: React.ReactNode
}

export const DrawerContent = ({ children }: DrawerContentProps) => {
  return <div className={styles.content}>{children}</div>
}

export type DrawerHeaderProps = {
  title: React.ReactNode
  onClose: () => void
}

export const DrawerHeader = ({
  title,
  onClose,
}: DrawerHeaderProps) => {
  return (
    <div className={styles.header}>
      {typeof title === 'string' ? (
        <Heading as="h3" size="sm">
          {title}
        </Heading>
      ) : (
        title
      )}

      <Button
        variant="bare"
        onClick={onClose}
        aria-label="Close drawer"
      >
        <IconClose aria-hidden="true" />
      </Button>
    </div>
  )
}
