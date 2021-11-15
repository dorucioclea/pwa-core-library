import { faHome } from '@fortawesome/free-solid-svg-icons'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { StatsTile } from '../../src/index'

export default {
  title: 'Stats/StatsTile',
  component: StatsTile,
} as ComponentMeta<typeof StatsTile>

const Template: ComponentStory<typeof StatsTile> = (args) => <StatsTile {...args} icon={faHome} />

export const Default = Template.bind({})
Default.args = {
  name: 'Awesome Stat',
  description: 'This is an optional description',
  value: 'Moon',
  color: 'red',
}
