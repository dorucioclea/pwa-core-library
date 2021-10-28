import { ComponentStory, ComponentMeta } from '@storybook/react'
import { FrontQuote } from '../../src/index'

export default {
  title: 'Front/Quote',
  component: FrontQuote,
} as ComponentMeta<typeof FrontQuote>

const Template: ComponentStory<typeof FrontQuote> = (args) => (
  <div className="bg-gray-50 py-4 max-w-6xl mx-auto">
    <FrontQuote {...args}>This could be any text that sounds smart.</FrontQuote>
  </div>
)

export const Default = Template.bind({})
Default.args = {
  title: 'Check out this quote',
}
