import React from 'react'
import BaseModal from 'react-modal'
import './StickyModal.css'

type Props = {
  open: boolean
  onClose?: () => void
  children: any
}

export const StickyModal = ({ open, onClose: handleClose, children }: Props) => {
  BaseModal.setAppElement('body')

  return (
    <BaseModal
      isOpen={open}
      onRequestClose={handleClose}
      closeTimeoutMS={400}
      className="modal-container-sticky bg-white pb-6 px-6 pt-2 focus:outline-none w-full max-w-3xl rounded-t-2xl"
      overlayClassName="modal-overlay modal-overlay-slide"
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
