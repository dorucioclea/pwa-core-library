import { ComponentStory, ComponentMeta } from '@storybook/react'
import { BrandingBanner } from '../../src/index'

export default {
  title: 'Layout/Banners/TopBrandingBanner',
  component: BrandingBanner,
} as ComponentMeta<typeof BrandingBanner>

const Template: ComponentStory<typeof BrandingBanner> = (args) => <BrandingBanner {...args} />

export const Default = Template.bind({})
Default.args = {}
