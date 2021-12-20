import { ComponentStory, ComponentMeta } from '@storybook/react'
import { MaiarDefiWalletLogo } from '../../src/index'

export default {
  title: 'Logos/MaiarDefiWalletLogo',
  component: MaiarDefiWalletLogo,
} as ComponentMeta<typeof MaiarDefiWalletLogo>

const Template: ComponentStory<typeof MaiarDefiWalletLogo> = (args) => (
  <div className="bg-gray-300 p-4">
    <MaiarDefiWalletLogo {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  white: false,
}
