import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Button } from '../../src/index'

export default {
  title: 'Controls/Button',
  component: Button,
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args}>Hey!</Button>

export const Default = Template.bind({})
Default.args = {
  color: 'blue',
}

export const Large = Template.bind({})
Large.args = {
  color: 'blue',
  large: true,
}
