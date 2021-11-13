import React from 'react'
import { toast, ToastContainer, Flip } from 'react-toastify'
import './Toast.css'

export const showToast = (text: string, type?: 'success' | 'info' | 'warning' | 'error') => {
  const getCssBodyClassNames = () => {
    if (type === 'success') return 'bg-green-300 border-green-500'
    if (type === 'warning') return 'bg-yellow-300 border-yellow-500'
    if (type === 'error') return 'bg-red-300 border-red-500'
    return 'bg-blue-300 border-blue-500'
  }

  const getCssClassNames = () => {
    if (type === 'success') return 'bg-green-600'
    if (type === 'warning') return 'bg-yellow-600'
    if (type === 'error') return 'bg-red-600'
    return 'text-blue-600'
  }

  const getCssProgressClassNames = () => {
    if (type === 'success') return 'bg-green-700'
    if (type === 'warning') return 'bg-yellow-700'
    if (type === 'error') return 'bg-red-700'
    return 'text-blue-700'
  }

  toast(text, {
    className: `rounded ${getCssClassNames()}`,
    bodyClassName: `flex border-l-4 px-4 py-2 max-w-lg rounded shadow-md text-white text-lg ${getCssBodyClassNames()}`,
    progressClassName: `rounded ${getCssProgressClassNames()}`,
    closeButton: false,
  })
}

export const ScyToastRoot = () => <ToastContainer position="top-center" pauseOnFocusLoss transition={Flip} />
