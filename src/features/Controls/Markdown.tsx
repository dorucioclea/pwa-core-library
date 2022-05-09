import React from 'react'
import MarkdownComponent from 'react-markdown'

type Props = {
  children: string
  className?: string
}

export const Markdown = (props: Props) => (
  <MarkdownComponent
    linkTarget="_blank"
    components={{
      h1: ({ node, ...props }) => <h2 className="mt-4" {...props} />,
      h2: ({ node, ...props }) => <h3 className="mt-4" {...props} />,
      h3: ({ node, ...props }) => <h4 className="mt-4" {...props} />,
      h4: ({ node, ...props }) => <h5 className="mt-4" {...props} />,
      h5: ({ node, ...props }) => <h6 className="mt-4" {...props} />,
      p: ({ node, ...props }) => <p className="py-2 text-xl md:text-2xl" {...props} />,
      blockquote: ({ node, ...props }) => (
        <blockquote className="my-4 border-l-4 border-primary-400 bg-gray-50 px-4 py-2 rounded-lg text-lg" {...props} />
      ),
      ul: ({ node, ...props }) => <ul className="list-disc pl-4 text-xl text-gray-600" {...props} />,
      ol: ({ node, ...props }) => <ol className="list-decimal pl-4 text-xl text-gray-600" {...props} />,
    }}
    className={props.className}
  >
    {props.children}
  </MarkdownComponent>
)
