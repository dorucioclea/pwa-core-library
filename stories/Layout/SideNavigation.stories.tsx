import { faHome } from '@fortawesome/free-solid-svg-icons'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { SideNavigation, SideNavigationItem } from '../../src/index'

const NavigationItems: SideNavigationItem[] = [
  { text: 'Dont', href: '#', icon: faHome, colorClassName: 'text-blue-500' },
  { text: 'Know', href: '#', icon: faHome, colorClassName: 'text-red-500' },
  { text: 'What', href: '#', colorClassName: 'text-green-500' },
]

export default {
  title: 'Layout/SideNavigation',
  component: SideNavigation,
} as ComponentMeta<typeof SideNavigation>

const Template: ComponentStory<typeof SideNavigation> = (args) => (
  <div className="max-w-md">
    <SideNavigation items={NavigationItems} {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {}
