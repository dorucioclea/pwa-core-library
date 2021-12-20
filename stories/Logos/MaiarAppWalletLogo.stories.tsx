import { ComponentStory, ComponentMeta } from '@storybook/react'
import { MaiarAppWalletLogo } from '../../src/index'

export default {
  title: 'Logos/MaiarAppWalletLogo',
  component: MaiarAppWalletLogo,
} as ComponentMeta<typeof MaiarAppWalletLogo>

const Template: ComponentStory<typeof MaiarAppWalletLogo> = (args) => (
  <div className="bg-gray-300 p-4">
    <MaiarAppWalletLogo {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  white: false,
}
