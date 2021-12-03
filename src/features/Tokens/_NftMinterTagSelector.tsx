import React, { KeyboardEvent, useState } from 'react'
import { faHashtag, faPlusSquare, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { showToast } from '../Feedback/Toast'
import { Input } from '../Controls/Input'
import { Button } from '../Controls/Button'

type Props = {
  tags: string[]
  onUpdate: (tags: string[]) => void
  className?: string
}

const _NftMinterTagSelector = (props: Props) => {
  const [tagInput, setTagInput] = useState('')

  const handleKeydownOrAdd = (event?: KeyboardEvent<HTMLInputElement>) => {
    if (tagInput.length < 1) return
    if (event && event.code !== 'Enter') return
    if (event) event.preventDefault()
    if (props.tags.includes(tagInput)) {
      showToast('You have already added this tag!', 'error')
      return
    }
    props.onUpdate([...props.tags, tagInput])
    setTagInput('')
  }

  const handleRemove = (tag: string) => props.onUpdate(props.tags.filter((t) => t !== tag))

  return (
    <div className={props.className}>
      <label htmlFor="tags" className="pl-1 text-xl mb-2 text-gray-800">
        Tags (Currently: <strong>{props.tags.length}</strong>)
      </label>
      <div className="flex mb-2">
        <Input
          id="tags"
          icon={faHashtag}
          value={tagInput}
          placeholder="yourtag"
          onChange={(val) => setTagInput(val.replace(' ', '').toLowerCase())}
          onKeyDown={handleKeydownOrAdd} // Must be keydown (!) otherwise Enter will submit the form
          max={20}
          className="flex-grow mr-2"
        />
        <Button color="gray" onClick={() => handleKeydownOrAdd()}>
          <FontAwesomeIcon icon={faPlusSquare} className="text-white opacity-90" />
          <span className="sr-only">Add</span>
        </Button>
      </div>
      <div className="flex flex-wrap items-center">
        {props.tags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleRemove(tag)}
            className="flex items-center px-4 py-1 rounded-md font-medium bg-gray-200 text-gray-800 text-lg mr-2 mb-2"
          >
            {tag}
            <FontAwesomeIcon icon={faTimes} size="sm" className="inline-block ml-2 text-gray-800 opacity-75" />
          </button>
        ))}
      </div>
    </div>
  )
}

export default _NftMinterTagSelector
