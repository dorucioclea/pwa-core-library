import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Select, SelectOption } from '../../src/index'

export default {
  title: 'Controls/Select',
  component: Select,
} as ComponentMeta<typeof Select>

const ExampleOptions: SelectOption[] = [
  { name: 'We', value: 'we' },
  { name: 'Are', value: 'are' },
  { name: 'Going to', value: 'going' },
  { name: 'Moon', value: 'moon' },
]

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} options={ExampleOptions} />

export const Default = Template.bind({})
Default.args = {}
