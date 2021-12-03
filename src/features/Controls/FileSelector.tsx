import React, { useState } from 'react'
import { faImage, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { classNames } from '../../helpers'
import { Button } from './Button'

type Props = {
  onSelect: (file: File) => void
  onReset: () => void
  allowedFilesDescription: string
  className?: string
}

export const FileSelector = (props: Props) => {
  const [previewSource, setPreviewSource] = useState<string | null>(null)

  const handleSelect = (file: File) => {
    setPreviewSource(URL.createObjectURL(file))
    props.onSelect(file)
  }

  const handleReset = () => {
    setPreviewSource(null)
    props.onReset()
  }

  return (
    <div
      className={classNames('flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-3xl bg-cover', props.className)}
      style={{ background: previewSource ? `url(${previewSource})` : undefined, minHeight: '12rem' }}
    >
      {!previewSource ? (
        <div className="space-y-1 text-center">
          <FontAwesomeIcon icon={faImage} size="4x" className="text-gray-500 opacity-25" />
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-xl font-medium text-xl text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
            >
              <span>Upload a file</span>
              <input
                id="file-upload"
                name="file-upload"
                onChange={(e) => e.target.files && e.target.files.length > 0 && handleSelect(e.target.files[0])}
                type="file"
                className="sr-only"
              />
            </label>
            <p className="pl-1 text-xl">or drag and drop</p>
          </div>
          <p className="text-sm text-gray-500">{props.allowedFilesDescription}</p>
        </div>
      ) : (
        <div className="w-full flex justify-end">
          <Button onClick={handleReset} color="red" className="h-10 shadow-lg">
            <FontAwesomeIcon icon={faTrash} className="text-white" />
            <span className="sr-only">Remove file</span>
          </Button>
        </div>
      )}
    </div>
  )
}