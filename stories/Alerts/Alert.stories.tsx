import { faHome } from '@fortawesome/free-solid-svg-icons'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Alert } from '../../src/index'

export default {
  title: 'Alerts/Alert',
  component: Alert,
} as ComponentMeta<typeof Alert>

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'builders are heroes',
}

const TemplateWithicon: ComponentStory<typeof Alert> = (args) => <Alert icon={faHome} {...args} />

export const Icon = TemplateWithicon.bind({})
Icon.args = {
  children: 'builders are heroes',
}
