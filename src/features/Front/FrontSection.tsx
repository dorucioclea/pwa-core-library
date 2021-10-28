import React, { ReactNode } from 'react'

type Props = {
  title: string
  description: string
  children?: ReactNode
  className?: string
  titleGradientClassName?: [string, string]
}

export const FrontSection = (props: Props) => {
  const titleColorClassName =
    props.titleGradientClassName && props.titleGradientClassName.length > 0
      ? `text-transparent bg-clip-text bg-gradient-to-br ${props.titleGradientClassName[0]} ${props.titleGradientClassName[1]}`
      : 'text-gray-800'

  return (
    <section className={`relative bg-gray-50 px-4 py-6 md:p-8 lg:p-12 rounded-xl ${props.className || 'mb-8'}`}>
      <h1 className={`text-5xl md:text-6xl mb-4 ${titleColorClassName}`}>{props.title}</h1>
      <p className="text-2xl md:text-3xl text-gray-600 mb-8">{props.description}</p>
      {props.children}
    </section>
  )
}
