import { ComponentStory, ComponentMeta } from '@storybook/react'
import { WalletConfig } from '../setup'
import { Address } from '../../src/index'
import { ScyRoot } from '../../src/ScyRoot'

export default {
  title: 'User/Address',
  component: Address,
} as ComponentMeta<typeof Address>

const Template: ComponentStory<typeof Address> = (args) => (
  <div>
    <Address {...args} walletConfig={WalletConfig} />
    <ScyRoot />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  value: 'erd1xxxYourxxxAddressxxx',
}
