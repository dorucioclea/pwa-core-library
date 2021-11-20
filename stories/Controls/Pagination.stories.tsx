import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Pagination } from '../../src/index'

export default {
  title: 'Controls/Pagination',
  component: Pagination,
} as ComponentMeta<typeof Pagination>

const Template: ComponentStory<typeof Pagination> = (args) => <Pagination {...args} />

export const Default = Template.bind({})
Default.args = {
  current: 5,
  total: 18,
}
