import React, { ReactNode } from 'react'

type Props = {
  children: string | ReactNode
  title?: string | ReactNode
  className?: string
  textClassName?: string
}

export const FrontQuote = (props: Props) => (
  <section className={`max-w-4xl mx-auto ${props.className || 'py-20 md:py-48 mb-8'}`}>
    {props.title && <h2 className="text-center mb-8">{props.title}</h2>}
    <p className={`text-2xl md:text-3xl text-center ${props.textClassName || 'text-gray-600'}`}>{props.children}</p>
  </section>
)
