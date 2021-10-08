import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { TopBrandingBanner } from '../../src/components/Banners/TopBrandingBanner'

export default {
  title: 'Layout/Banners/TopBrandingBanner',
  component: TopBrandingBanner,
} as ComponentMeta<typeof TopBrandingBanner>

const Template: ComponentStory<typeof TopBrandingBanner> = (args) => <TopBrandingBanner {...args} />

export const Primary = Template.bind({})
Primary.args = {}
