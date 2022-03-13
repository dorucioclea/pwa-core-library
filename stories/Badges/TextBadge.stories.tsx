import { ComponentStory, ComponentMeta } from '@storybook/react'
import { TextBadge } from '../../src/index'

export default {
  title: 'Badges/TextBadge',
  component: TextBadge,
} as ComponentMeta<typeof TextBadge>

const Template: ComponentStory<typeof TextBadge> = (args) => <TextBadge {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'hey young lady',
  color: 'blue',
}
