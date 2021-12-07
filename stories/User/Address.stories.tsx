import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Address } from '../../src/index'
import { ScyRoot } from '../../src/ScyRoot'

export default {
  title: 'User/Address',
  component: Address,
} as ComponentMeta<typeof Address>

const Template: ComponentStory<typeof Address> = (args) => (
  <div>
    <Address {...args} />
    <ScyRoot />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  children: 'erd1xxxYourxxxAddressxxx',
}
