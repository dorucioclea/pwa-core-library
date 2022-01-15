import React, { KeyboardEvent, useState } from 'react'
import { faHashtag, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { showToast } from '../Feedback/Toast'
import { Input } from '../Controls/Input'
import { Button } from '../Controls/Button'
import { sanitizeAlphanumeric } from '../../helpers'

type Props = {
  tags: string[]
  onUpdate: (tags: string[]) => void
  className?: string
}

const _NftMinterTagAdder = (props: Props) => {
  const [tagInput, setTagInput] = useState('')

  const handleKeydownOrAdd = (event?: KeyboardEvent<HTMLInputElement>) => {
    if (tagInput.length < 1) return
    if (event && event.code !== 'Enter') return
    if (event) event.preventDefault()
    if (props.tags.length >= 10) {
      showToast('You can have a max. of 10 tags', 'error')
      return
    }
    if (props.tags.includes(tagInput)) {
      showToast('You have already added this tag', 'error')
      return
    }
    props.onUpdate([...props.tags, tagInput])
    setTagInput('')
  }

  return (
    <div className={props.className}>
      <label htmlFor="tags" className="pl-1 text-lg md:text-xl mb-2 text-gray-800">
        Tags (Currently: <strong>{props.tags.length}</strong>)
      </label>
      <div className="flex mb-2">
        <Input
          id="tags"
          icon={faHashtag}
          value={tagInput}
          placeholder="yourtag"
          onChange={(val) => setTagInput(sanitizeAlphanumeric(val).toLowerCase())}
          onKeyDown={handleKeydownOrAdd} // Must be keydown (!) otherwise Enter will submit the form
          maxLength={20}
          className="flex-grow mr-2"
        />
        <Button color="gray" onClick={() => handleKeydownOrAdd()}>
          <FontAwesomeIcon icon={faPlusSquare} className="text-white opacity-90" />
          <span className="sr-only">Add</span>
        </Button>
      </div>
    </div>
  )
}

export default _NftMinterTagAdder
