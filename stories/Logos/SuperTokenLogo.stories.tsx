import { ComponentStory, ComponentMeta } from '@storybook/react'
import { SuperTokenLogo } from '../../src/index'

export default {
  title: 'Logos/SuperToken',
  component: SuperTokenLogo,
} as ComponentMeta<typeof SuperTokenLogo>

const Template: ComponentStory<typeof SuperTokenLogo> = (args) => (
  <div className="bg-gray-300 p-4">
    <SuperTokenLogo {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {}
