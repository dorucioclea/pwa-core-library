import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Slider } from '../../src/index'

export default {
  title: 'Controls/Slider',
  component: Slider,
} as ComponentMeta<typeof Slider>

const Template: ComponentStory<typeof Slider> = (args) => <Slider {...args} />

export const Default = Template.bind({})
Default.args = {}
