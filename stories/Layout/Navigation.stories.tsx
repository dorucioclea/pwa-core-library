import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Navigation, NavigationItem } from '../../src/index'

const NavigationItems: NavigationItem[] = [
  { text: 'dont', href: '#' },
  { text: 'know', href: '#' },
  { text: 'what', href: '#' },
]

export default {
  title: 'Layout/Navigation',
  component: Navigation,
} as ComponentMeta<typeof Navigation>

const Template: ComponentStory<typeof Navigation> = (args) => (
  <div className="bg-gray-800 py-4 flex justify-center">
    <Navigation items={NavigationItems} {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {}
