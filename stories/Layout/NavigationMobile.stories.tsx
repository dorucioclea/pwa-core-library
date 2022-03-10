import { faHouse, faSearch, faUser } from '@fortawesome/free-solid-svg-icons'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { NavigationMobile, NavigationItem, ScyRoot } from '../../src/index'

const NavigationItems: NavigationItem[] = [
  { text: 'dont', href: '#', icon: faHouse },
  { text: 'know', href: '#', icon: faSearch },
  { text: 'what (hover me)', href: '#', icon: faUser },
]

export default {
  title: 'Layout/NavigationMobile',
  component: NavigationMobile,
} as ComponentMeta<typeof NavigationMobile>

const Template: ComponentStory<typeof NavigationMobile> = (args) => (
  <div className="bg-gray-800 py-4 flex justify-center">
    <ScyRoot />
    <NavigationMobile items={NavigationItems} {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {}
