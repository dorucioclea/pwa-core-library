import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DevModeBanner } from '../../src/index'

export default {
  title: 'Layout/Banners/DevModeBanner',
  component: DevModeBanner,
} as ComponentMeta<typeof DevModeBanner>

const Template: ComponentStory<typeof DevModeBanner> = (args) => <DevModeBanner {...args} />

export const Default = Template.bind({})
Default.args = {}
