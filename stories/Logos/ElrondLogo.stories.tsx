import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ElrondLogo } from '../../src/index'

export default {
  title: 'Logos/Elrond',
  component: ElrondLogo,
} as ComponentMeta<typeof ElrondLogo>

const Template: ComponentStory<typeof ElrondLogo> = (args) => (
  <div className="bg-gray-300 p-4">
    <ElrondLogo {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  white: false,
}
