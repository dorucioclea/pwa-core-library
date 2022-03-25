import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ArrowButton } from '../../src/index'

export default {
  title: 'Controls/ArrowButton',
  component: ArrowButton,
} as ComponentMeta<typeof ArrowButton>

const Template: ComponentStory<typeof ArrowButton> = (args) => (
  <div className="bg-gray-200 p-4">
    <ArrowButton {...args} icon={faHouse} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  children: 'some content',
}
