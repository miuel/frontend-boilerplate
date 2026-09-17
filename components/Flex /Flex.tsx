import clsx from 'clsx'
import { ElementType, forwardRef } from 'react'

import './Flex.scss'

type BasisValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

type ResponsiveBasisValue =
  | BasisValue
  | {
      init: BasisValue
      md: BasisValue
    }

const getClassNames = (
  value: ResponsiveBasisValue,
  prefix: string
) => {
  if (typeof value === 'number') {
    return `${prefix}-${value}`
  }

  return Object.entries(value).map(([target, basis]) => {
    if (target === 'init') {
      return `${prefix}-${basis}`
    }

    return `${target}-${prefix}-${basis}`
  })
}

export type FlexRootProps = React.ComponentPropsWithRef<'div'> & {
  as?: ElementType
  wrap?: boolean
}

const Root = forwardRef<HTMLDivElement, FlexRootProps>(
  ({ children, className, wrap, as, ...rest }, ref) => {
    const Component = as || 'div'

    return (
      <Component
        ref={ref}
        className={clsx(
          'flex',
          wrap && 'flex-wrap',
          className
        )}
        {...rest}
      >
        {children}
      </Component>
    )
  }
)

Root.displayName = 'Flex.Root'

export type FlexItemProps = React.ComponentPropsWithRef<'div'> & {
  basis: ResponsiveBasisValue
}

const Item = forwardRef<HTMLDivElement, FlexItemProps>(
  ({ children, basis, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'flex-basis',
          getClassNames(basis, 'flex-basis'),
          className
        )}
        {...rest}
      >
        {children}
      </div>
    )
  }
)

Item.displayName = 'Flex.Item'

export const Flex = {
  Root,
  Item,
}
