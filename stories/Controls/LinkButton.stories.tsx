import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { LinkButton } from '../../src/features/Controls/LinkButton'

export default {
  title: 'Controls/LinkButton',
  component: LinkButton,
} as ComponentMeta<typeof LinkButton>

const Template: ComponentStory<typeof LinkButton> = (args) => <LinkButton {...args}>Hey!</LinkButton>

export const Default = Template.bind({})
Default.args = {
  color: 'blue',
}
