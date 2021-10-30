import { ComponentStory, ComponentMeta } from '@storybook/react'
import type { WalletServiceConfig } from '../../src/index'
import { ConnectButton } from '../../src/index'

const FakeWalletConfig: WalletServiceConfig = {
  GatewayAddress: '',
  WebWalletUrl: '',
}

export default {
  title: 'Auth/ConnectButton',
  component: ConnectButton,
} as ComponentMeta<typeof ConnectButton>

const Template: ComponentStory<typeof ConnectButton> = (args) => <ConnectButton walletConfig={FakeWalletConfig} {...args} />

export const Default = Template.bind({})
Default.args = {}
