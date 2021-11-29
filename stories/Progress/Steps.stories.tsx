import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Steps } from '../../src/index'

export default {
  title: 'Progress/Steps',
  component: Steps,
} as ComponentMeta<typeof Steps>

const Template: ComponentStory<typeof Steps> = (args) => <Steps {...args} />

export const Default = Template.bind({})
Default.args = {
  total: 4,
  active: 2,
}
