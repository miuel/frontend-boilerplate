import clsx from 'clsx'

import { Text, TextProps } from '@/components/Typography'
import { ContentTransformer, NodeProps } from './ContentTransformer'
import styles from './RichText.module.scss'

export type RichTextProps = Omit<TextProps<'div'>, 'as' | 'children'> & {
  json: NodeProps[] | NodeProps
}

export const RichText = ({
  json,
  className,
  ...props
}: RichTextProps) => {
  return (
    <Text
      as="div"
      className={clsx(styles.root, className)}
      {...props}
    >
      <ContentTransformer json={json} />
    </Text>
  )
}
