import React, { useCallback, useState } from 'react'
import { faImage, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { classNames } from '../../helpers'
import { Button } from './Button'
import { useDropzone } from 'react-dropzone'

type Props = {
  onSelect: (file: File) => void
  onReset: () => void
  allowedFilesDescription: string
  className?: string
}

export const FileSelector = (props: Props) => {
  const [previewSource, setPreviewSource] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles) => handleSelect(acceptedFiles[0]), [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

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
      className={classNames(
        'flex justify-center px-6 py-2 sm:py-4 md:py-6 lg:py-8 xl:py-10 border-2 border-dashed rounded-3xl bg-cover',
        props.className,
        isDragActive ? 'border-blue-400' : 'border-gray-300'
      )}
      style={{ background: previewSource ? `url(${previewSource})` : undefined }}
      {...getRootProps()}
    >
      {!previewSource ? (
        <div className="flex md:flex-col items-center space-y-1">
          <FontAwesomeIcon icon={faImage} size="2x" className="md:hidden text-gray-500 opacity-25" />
          <FontAwesomeIcon icon={faImage} size="4x" className="hidden md:block text-gray-500 opacity-25" />
          <div className="pl-4 md:pl-0">
            {isDragActive ? (
              <p className="text-xl md:text-2xl text-blue-400 font-head font-bold">Drop it like it's hot! :)</p>
            ) : (
              <div className="flex text-sm text-gray-600">
                <span className="relative cursor-pointer rounded-xl font-medium text-xl text-primary-600 hover:text-primary-500">
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    onChange={(e) => e.target.files && e.target.files.length > 0 && handleSelect(e.target.files[0])}
                    type="file"
                    className="sr-only"
                    {...getInputProps()}
                  />
                </span>
                <p className="pl-1 text-xl hidden md:block">or drag and drop</p>
              </div>
            )}
            <p className="text-xs md:text-sm text-gray-500 text-center">{props.allowedFilesDescription}</p>
          </div>
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
