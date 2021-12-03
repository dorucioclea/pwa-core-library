import { ComponentStory, ComponentMeta } from '@storybook/react'
import { FileSelector } from '../../src/index'

export default {
  title: 'Controls/FileSelector',
  component: FileSelector,
} as ComponentMeta<typeof FileSelector>

const Template: ComponentStory<typeof FileSelector> = (args) => <FileSelector {...args} />

export const Default = Template.bind({})
Default.args = {
  allowedFilesDescription: 'PNG, JPG, GIF up to 10MB',
}
