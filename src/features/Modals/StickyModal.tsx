import React from 'react'
import BaseModal from 'react-modal'

interface IProps {
  open: boolean
  onClose: () => void
  children: any
}

export const StickyModal = ({ open, onClose: handleClose, children }: IProps) => {
  BaseModal.setAppElement('body')

  return (
    <BaseModal
      isOpen={open}
      onRequestClose={handleClose}
      closeTimeoutMS={400}
      className="fixed bottom-0 left-1/2 transform -translate-x-1/2 shadow-2xl bg-white pb-6 px-6 pt-2 focus:outline-none w-full max-w-3xl rounded-t-2xl"
      overlayClassName="min-h-screen fixed left-0 top-0 w-full bg-black bg-opacity-20"
    >
      <button className="w-full h-8 focus:outline-none text-center relative" onClick={handleClose}>
        <span
          className="block absolute top-0 w-8 h-1 bg-gray-300 opacity-75 rounded-full"
          style={{ top: '0.5rem', left: '50%', transform: 'translateX(-50%)' }}
        />
        <span className="sr-only">Close</span>
      </button>
      {children}
    </BaseModal>
  )
}
