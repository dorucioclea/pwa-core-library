import { faUser } from '@fortawesome/free-solid-svg-icons'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Input } from '../../src/index'

export default {
  title: 'Controls/Input',
  component: Input,
} as ComponentMeta<typeof Input>

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />

export const Default = Template.bind({})
Default.args = {}

export const WithIcon = Template.bind({})
WithIcon.args = {
  icon: faUser,
}
