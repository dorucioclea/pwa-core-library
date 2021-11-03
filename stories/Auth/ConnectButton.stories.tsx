import { ComponentStory, ComponentMeta } from '@storybook/react'
import type { WalletServiceConfig } from '../../src/index'
import { ConnectButton } from '../../src/index'

const FakeWalletConfig: WalletServiceConfig = {
  GatewayAddress: 'https://testnet-gateway.elrond.com',
  WebWalletUrl: 'https://testnet-wallet.elrond.com/dapp/init',
  WalletConnectBridge: 'https://bridge.walletconnect.org',
}

const RequestFakeToken = () => new Promise<string>((resolve) => resolve('some-token'))

export default {
  title: 'Auth/ConnectButton',
  component: ConnectButton,
} as ComponentMeta<typeof ConnectButton>

const Template: ComponentStory<typeof ConnectButton> = (args) => (
  <ConnectButton walletConfig={FakeWalletConfig} onTokenRequest={RequestFakeToken} {...args} />
)

export const Default = Template.bind({})
Default.args = {}
