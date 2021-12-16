import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Navigation, NavigationItem, ScyRoot } from '../../src/index'

const NavigationItems: NavigationItem[] = [
  { text: 'dont', href: '#' },
  { text: 'know', href: '#' },
  { text: 'what (hover me)', href: '#', soon: true },
]

export default {
  title: 'Layout/Navigation',
  component: Navigation,
} as ComponentMeta<typeof Navigation>

const Template: ComponentStory<typeof Navigation> = (args) => (
  <div className="bg-gray-800 py-4 flex justify-center">
    <ScyRoot />
    <Navigation items={NavigationItems} {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {}
