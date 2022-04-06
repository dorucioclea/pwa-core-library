import React from 'react'
import { trimHash } from '../../helpers'
import { classNames } from '../../helpers'
import { showToast } from '../Feedback/Toast'
import { useClipboard } from 'use-clipboard-copy'
import { IWalletService } from '../../services/wallet'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
  value: string
  wallet?: IWalletService
  className?: string
}

export const Address = (props: Props) => {
  const clipboard = useClipboard({
    onSuccess: () => showToast('Copied!', 'info'),
  })

  return (
    <div className={classNames('flex', props.className || 'mb-4')}>
      <a href={`${props.wallet?.getConfig().Explorer}/accounts/${props.value}`} target="_blank" className="block text-gray-400">
        <span className="sm:hidden">{trimHash(props.value || '', 15)}</span>
        <span className="hidden sm:inline">{props.value}</span>
      </a>
      <button onClick={() => clipboard.copy(props.value)}>
        <FontAwesomeIcon icon={faCopy} className="inline-block ml-2 text-gray-400 opacity-80" />
      </button>
    </div>
  )
}
