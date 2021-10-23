import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DisconnectButton } from '../../src/index'

export default {
  title: 'Auth/DisconnectButton',
  component: DisconnectButton,
} as ComponentMeta<typeof DisconnectButton>

const Template: ComponentStory<typeof DisconnectButton> = (args) => (
  <div className="bg-gray-800 p-8">
    <DisconnectButton {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {}
