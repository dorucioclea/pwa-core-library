import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Tooltip } from '../../src/index'

const MockComponent = () => <Tooltip tip="you're looking good today :)">Hover me :)</Tooltip>

export default {
  title: 'Feedback/Tooltip',
  component: MockComponent,
} as ComponentMeta<typeof MockComponent>

const Template: ComponentStory<typeof MockComponent> = (args) => <MockComponent />

export const Default = Template.bind({})
Default.args = {}
