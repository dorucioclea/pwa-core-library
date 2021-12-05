import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ConnectButton } from '../../src/index'
import { getWalletService, WalletConfig } from '../setup'

const RequestFakeToken = () => Promise.resolve('sometoken')

export default {
  title: 'Auth/ConnectButton',
  component: ConnectButton,
} as ComponentMeta<typeof ConnectButton>

const Template: ComponentStory<typeof ConnectButton> = (args) => (
  <ConnectButton {...args} walletConfig={WalletConfig} walletService={getWalletService()} onTokenRequest={RequestFakeToken} />
)

export const Default = Template.bind({})
Default.args = {}

export const ForceOpen = Template.bind({})
ForceOpen.args = {
  forceOpen: true,
}
