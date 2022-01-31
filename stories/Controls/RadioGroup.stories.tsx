import { ComponentStory, ComponentMeta } from '@storybook/react'
import { RadioGroup, RadioGroupItem } from '../../src/index'

export default {
  title: 'Controls/RadioGroup',
  component: RadioGroup,
} as ComponentMeta<typeof RadioGroup>

const Examples: RadioGroupItem[] = [
  { id: 'something', title: 'Something' },
  { id: 'else', title: 'Else' },
  { id: 'tip', title: 'Tooltip', tip: 'Just an example tooltip - you know :)' },
]

const Template: ComponentStory<typeof RadioGroup> = (args) => <RadioGroup items={Examples} {...args} />

export const Default = Template.bind({})
Default.args = {}
