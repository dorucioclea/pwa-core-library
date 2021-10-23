import { ComponentStory, ComponentMeta } from '@storybook/react'
import { MaiarLogo } from '../../src/index'

export default {
  title: 'Logos/Maiar',
  component: MaiarLogo,
} as ComponentMeta<typeof MaiarLogo>

const Template: ComponentStory<typeof MaiarLogo> = (args) => (
  <div className="bg-gray-300 p-4">
    <MaiarLogo {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {}
