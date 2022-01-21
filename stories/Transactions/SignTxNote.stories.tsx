import { ComponentStory, ComponentMeta } from '@storybook/react'
import { SignTxNote, ScyRoot } from '../../src/index'

export default {
  title: 'Transactions/SignTxNote',
  component: SignTxNote,
} as ComponentMeta<typeof SignTxNote>

const Template: ComponentStory<typeof SignTxNote> = (args) => (
  <div>
    <SignTxNote {...args} />
    <ScyRoot />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  actions: ['transfer nft'],
}
