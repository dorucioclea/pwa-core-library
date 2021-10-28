import { ComponentStory, ComponentMeta } from '@storybook/react'
import { FrontHero } from '../../src/index'

export default {
  title: 'Front/Hero',
  component: FrontHero,
} as ComponentMeta<typeof FrontHero>

const Template: ComponentStory<typeof FrontHero> = (args) => (
  <div className="bg-gray-50 py-4 max-w-6xl mx-auto">
    <FrontHero {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  title: 'Superciety',
  description: 'Is very super',
  ctaText: 'Check it out',
  ctaLink: '#',
}
