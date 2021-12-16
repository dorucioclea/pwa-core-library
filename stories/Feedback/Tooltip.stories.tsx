import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ScyRoot } from '../../src/index'

const MockComponent = () => (
  <div className="block w-full h-screen">
    <ScyRoot />
    <span data-tip="Just some example text :)" className="block p-4 bg-blue-500 text-white text-lg rounded-lg">
      Hover me :)
    </span>
  </div>
)

export default {
  title: 'Feedback/Tooltip',
  component: MockComponent,
} as ComponentMeta<typeof MockComponent>

const Template: ComponentStory<typeof MockComponent> = (args) => <MockComponent />

export const Default = Template.bind({})
Default.args = {}
