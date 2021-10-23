import { ComponentStory, ComponentMeta } from '@storybook/react'
import { LedgerLogo } from '../../src/index'

export default {
  title: 'Logos/Ledger',
  component: LedgerLogo,
} as ComponentMeta<typeof LedgerLogo>

const Template: ComponentStory<typeof LedgerLogo> = (args) => (
  <div className="bg-gray-300 p-4">
    <LedgerLogo {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  white: false,
}
