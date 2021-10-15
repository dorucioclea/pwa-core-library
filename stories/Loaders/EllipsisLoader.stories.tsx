import { ComponentStory, ComponentMeta } from '@storybook/react'
import { EllipsisLoader } from '../../src/features/Loaders/EllipsisLoader'

export default {
  title: 'Elements/Loaders/EllipsisLoader',
  component: EllipsisLoader,
} as ComponentMeta<typeof EllipsisLoader>

const Template: ComponentStory<typeof EllipsisLoader> = (args) => <EllipsisLoader {...args} />

export const Default = Template.bind({})
Default.args = {}
