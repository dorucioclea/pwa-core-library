import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useState } from 'react'
import { StickyModal } from '../../src/features/Modals/StickyModal'

export default {
  title: 'Modals/StickyModal',
  component: StickyModal,
} as ComponentMeta<typeof StickyModal>

const Template: ComponentStory<typeof StickyModal> = (args) => {
  const [isOpen, setIsOpen] = useState(args.open)

  return (
    <div className="w-full min-h-screen">
      <StickyModal {...args} open={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Some content</h2>
        <p>Some more content!</p>
      </StickyModal>
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {
  open: true,
}
