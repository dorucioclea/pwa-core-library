import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ScyToastRoot, showToast } from '../../src/index'

const ButtonClassNames = 'bg-gray-100 rounded-lg m-2 px-2 py-1'

const MockComponent = () => (
  <div className="block w-full h-screen">
    <ScyToastRoot />
    <button className={ButtonClassNames} onClick={() => showToast('this is a success - like you!', 'success')}>
      Success
    </button>
    <button className={ButtonClassNames} onClick={() => showToast('this is an info - like you!', 'info')}>
      Info
    </button>
    <button className={ButtonClassNames} onClick={() => showToast('this is a warning - like you!', 'warning')}>
      Warning
    </button>
    <button className={ButtonClassNames} onClick={() => showToast('this is an error - like you!', 'error')}>
      Error
    </button>
  </div>
)

export default {
  title: 'Feedback/Toast',
  component: MockComponent,
} as ComponentMeta<typeof MockComponent>

const Template: ComponentStory<typeof MockComponent> = (args) => <MockComponent />

export const Default = Template.bind({})
Default.args = {}
