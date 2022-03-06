import { ComponentStory, ComponentMeta } from '@storybook/react'
import { SuperTrustLogo } from '../../src/index'

export default {
  title: 'Logos/SuperTrust',
  component: SuperTrustLogo,
} as ComponentMeta<typeof SuperTrustLogo>

const Template: ComponentStory<typeof SuperTrustLogo> = (args) => (
  <div className="bg-gray-300 p-4">
    <SuperTrustLogo {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {}
