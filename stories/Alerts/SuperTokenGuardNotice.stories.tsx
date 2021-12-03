import { ComponentStory, ComponentMeta } from '@storybook/react'
import { SuperTokenGuardNotice } from '../../src/index'

export default {
  title: 'Alerts/SuperTokenGuardNotice',
  component: SuperTokenGuardNotice,
} as ComponentMeta<typeof SuperTokenGuardNotice>

const Template: ComponentStory<typeof SuperTokenGuardNotice> = (args) => <SuperTokenGuardNotice {...args} />

export const Default = Template.bind({})
Default.args = {
  total: 4,
  active: 2,
}
