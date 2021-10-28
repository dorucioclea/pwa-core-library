import { ComponentStory, ComponentMeta } from '@storybook/react'
import { FrontSection } from '../../src/index'

export default {
  title: 'Front/Section',
  component: FrontSection,
} as ComponentMeta<typeof FrontSection>

const Template: ComponentStory<typeof FrontSection> = (args) => (
  <div className="bg-gray-50 py-4 max-w-6xl mx-auto">
    <FrontSection titleGradientClassName={['from-blue-500', 'to-green-300']} {...args}>
      <p>Free content</p>
    </FrontSection>
  </div>
)

export const Default = Template.bind({})
Default.args = {
  title: 'Something interesting',
  description: 'Something interesting to show off',
}
