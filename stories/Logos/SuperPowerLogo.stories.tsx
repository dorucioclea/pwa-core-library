import { ComponentStory, ComponentMeta } from '@storybook/react'
import { SuperPowerLogo } from '../../src/index'

export default {
  title: 'Logos/SuperPower',
  component: SuperPowerLogo,
} as ComponentMeta<typeof SuperPowerLogo>

const Template: ComponentStory<typeof SuperPowerLogo> = (args) => (
  <div className="bg-gray-300 p-4">
    <SuperPowerLogo {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {}
