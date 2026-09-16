import { Fragment, ReactNode } from 'react'
import Link from 'next/link'

export interface NodeMetadata {
  href?: string
  [key: string]: unknown
}

export interface NodeProps {
  kind?: string
  type?: string | null
  textContent?: string
  children?: NodeProps[]
  metadata?: NodeMetadata
  overrides?: Overrides | null
}

export type Override = (props: NodeProps) => ReactNode

export interface Overrides {
  link?: Override
  'unordered-list'?: Override
  'ordered-list'?: Override
  list?: Override
  'list-item'?: Override
  quote?: Override
  paragraph?: Override
  preformatted?: Override
  code?: Override
  underlined?: Override
  strong?: Override
  emphasized?: Override
  div?: Override
  span?: Override
  'line-break'?: Override
  heading1?: Override
  heading2?: Override
  heading3?: Override
  heading4?: Override
  heading5?: Override
  heading6?: Override
  deleted?: Override
  subscripted?: Override
  superscripted?: Override
  'horizontal-line'?: Override
  table?: Override
  'table-row'?: Override
  'table-cell'?: Override
  'table-head-cell'?: Override
}

export interface ContentTransformerProps {
  overrides?: Overrides | null
  json?: NodeProps[] | NodeProps
}

export const NodeContent = (props: NodeProps) => {
  const { textContent, children, overrides } = props

  if (textContent) {
    return renderTextContent(textContent)
  }

  if (!children) {
    return null
  }

  return (
    <>
      {children.map((child, index) => (
        <ContentTransformerNode
          key={index}
          {...child}
          overrides={overrides}
        />
      ))}
    </>
  )
}

export const Renderers: Record<
  keyof Overrides,
  (props: NodeProps) => ReactNode
> = {
  link: props => {
    const href = props.metadata?.href

    if (!href) {
      return <NodeContent {...props} />
    }

    const isInternal = href.startsWith('/')

    if (isInternal) {
      return (
        <Link href={href}>
          <NodeContent {...props} />
        </Link>
      )
    }

    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        <NodeContent {...props} />
      </a>
    )
  },

  'unordered-list': props => (
    <ul>
      <NodeContent {...props} />
    </ul>
  ),

  'ordered-list': props => (
    <ol>
      <NodeContent {...props} />
    </ol>
  ),

  list: props => (
    <ul>
      <NodeContent {...props} />
    </ul>
  ),

  'list-item': props => (
    <li>
      <NodeContent {...props} />
    </li>
  ),

  quote: props =>
    props.kind === 'block' ? (
      <blockquote>
        <NodeContent {...props} />
      </blockquote>
    ) : (
      <q>
        <NodeContent {...props} />
      </q>
    ),

  paragraph: props => (
    <p>
      <NodeContent {...props} />
    </p>
  ),

  preformatted: props => (
    <pre>
      <NodeContent {...props} />
    </pre>
  ),

  code: props => (
    <code>
      <NodeContent {...props} />
    </code>
  ),

  underlined: props => (
    <u>
      <NodeContent {...props} />
    </u>
  ),

  strong: props => (
    <strong>
      <NodeContent {...props} />
    </strong>
  ),

  emphasized: props => (
    <em>
      <NodeContent {...props} />
    </em>
  ),

  div: props => (
    <div>
      <NodeContent {...props} />
    </div>
  ),

  span: props => <NodeContent {...props} />,

  'line-break': () => <br />,

  heading1: props => (
    <h1>
      <NodeContent {...props} />
    </h1>
  ),

  heading2: props => (
    <h2>
      <NodeContent {...props} />
    </h2>
  ),

  heading3: props => (
    <h3>
      <NodeContent {...props} />
    </h3>
  ),

  heading4: props => (
    <h4>
      <NodeContent {...props} />
    </h4>
  ),

  heading5: props => (
    <h5>
      <NodeContent {...props} />
    </h5>
  ),

  heading6: props => (
    <h6>
      <NodeContent {...props} />
    </h6>
  ),

  deleted: props => (
    <del>
      <NodeContent {...props} />
    </del>
  ),

  subscripted: props => (
    <sub>
      <NodeContent {...props} />
    </sub>
  ),

  superscripted: props => (
    <sup>
      <NodeContent {...props} />
    </sup>
  ),

  'horizontal-line': () => <hr />,

  table: props => (
    <table>
      <tbody>
        <NodeContent {...props} />
      </tbody>
    </table>
  ),

  'table-row': props => (
    <tr>
      <NodeContent {...props} />
    </tr>
  ),

  'table-cell': props => (
    <td>
      <NodeContent {...props} />
    </td>
  ),

  'table-head-cell': props => (
    <th>
      <NodeContent {...props} />
    </th>
  ),
}

export function renderTextContent(text: string) {
  const parts = text.split(/\n/g)

  if (parts.length === 1) {
    return <>{text}</>
  }

  return (
    <>
      {parts.map((part, index) => (
        <Fragment key={index}>
          {part}
          {index < parts.length - 1 && <br />}
        </Fragment>
      ))}
    </>
  )
}

export const ContentTransformerNode = ({
  type,
  kind,
  textContent,
  overrides,
  ...rest
}: NodeProps): ReactNode => {
  if (!type && textContent) {
    return renderTextContent(textContent)
  }

  let Renderer = Renderers.span

  if (type) {
    const tag = type as keyof Overrides
    Renderer = overrides?.[tag] ?? Renderers[tag] ?? Renderers.span
  } else if (kind === 'block') {
    Renderer = Renderers.div
  }

  return (
    <Renderer
      type={type}
      kind={kind}
      textContent={textContent}
      overrides={overrides}
      {...rest}
    />
  )
}

export const ContentTransformer = ({
  overrides = null,
  json,
}: ContentTransformerProps) => {
  if (!json) {
    return null
  }

  if (Array.isArray(json)) {
    return (
      <>
        {json.map((node, index) => (
          <ContentTransformerNode
            key={index}
            {...node}
            overrides={overrides}
          />
        ))}
      </>
    )
  }

  return <ContentTransformerNode {...json} overrides={overrides} />
}
