import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Tooltip, ScyRoot } from '../../src/index'

export default {
  title: 'Feedback/Tooltip',
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>

const Template: ComponentStory<typeof Tooltip> = (args) => (
  <div>
    <Tooltip tip="you're looking good today :)">
      <span>Hover me :)</span>
    </Tooltip>
    <ScyRoot />
  </div>
)

export const Default = Template.bind({})
Default.args = {}
