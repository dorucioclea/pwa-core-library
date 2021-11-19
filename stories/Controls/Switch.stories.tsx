import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Switch } from '../../src/index'

export default {
  title: 'Controls/Switch',
  component: Switch,
} as ComponentMeta<typeof Switch>

const Template: ComponentStory<typeof Switch> = (args) => <Switch {...args} />

export const Default = Template.bind({})
Default.args = {}
