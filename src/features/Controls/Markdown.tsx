import React from 'react'
import MarkdownComponent from 'react-markdown'

type Props = {
  children: string
}

export const Markdown = (props: Props) => (
  <MarkdownComponent
    linkTarget="_blank"
    components={{
      h1: 'h2',
      p: ({ node, ...props }) => <p className="py-2 text-xl md:text-2xl" {...props} />,
      blockquote: ({ node, ...props }) => <blockquote className="my-4 border-l-4 border-primary-500 bg-gray-50 px-4 py-2 rounded-lg" {...props} />,
    }}
  >
    {props.children}
  </MarkdownComponent>
)
