import { ComponentStory, ComponentMeta } from '@storybook/react'
import { SuperPowerGuardNotice } from '../../src/index'

export default {
  title: 'Alerts/SuperPowerGuardNotice',
  component: SuperPowerGuardNotice,
} as ComponentMeta<typeof SuperPowerGuardNotice>

const Template: ComponentStory<typeof SuperPowerGuardNotice> = (args) => <SuperPowerGuardNotice {...args} />

export const Default = Template.bind({})
Default.args = {
  additional: '',
}
