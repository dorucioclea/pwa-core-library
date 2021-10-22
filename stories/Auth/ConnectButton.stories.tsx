import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ConnectButton } from '../../src/index'

export default {
  title: 'Auth/ConnectButton',
  component: ConnectButton,
} as ComponentMeta<typeof ConnectButton>

const Template: ComponentStory<typeof ConnectButton> = (args) => <ConnectButton {...args} />

export const Default = Template.bind({})
Default.args = {}
