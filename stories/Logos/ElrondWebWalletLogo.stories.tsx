import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ElrondWebWalletLogo } from '../../src/index'

export default {
  title: 'Logos/ElrondWebWalletLogo',
  component: ElrondWebWalletLogo,
} as ComponentMeta<typeof ElrondWebWalletLogo>

const Template: ComponentStory<typeof ElrondWebWalletLogo> = (args) => (
  <div className="bg-gray-300 p-4">
    <ElrondWebWalletLogo {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  white: false,
}
