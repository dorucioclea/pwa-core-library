import React, { useMemo } from 'react'
import * as Constants from '../../constants'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { trimHash } from '../../helpers'
import { useClipboard } from 'use-clipboard-copy'
import { showToast } from '../Feedback/Toast'
import { classNames } from '../../helpers'

type Props = {
  children: string
  chain?: 'mainnet' | 'testnet' | 'devnet'
  className?: string
}

export const Address = (props: Props) => {
  const clipboard = useClipboard({
    onSuccess: () => showToast('Copied!', 'info'),
  })

  const explorerBaseUrl = useMemo(() => {
    if (props.chain === 'devnet') return Constants.ExplorerUrlDevnet
    if (props.chain === 'testnet') return Constants.ExplorerUrlTestnet
    return Constants.ExplorerUrl
  }, [props.chain])

  return (
    <div className={classNames('flex', props.className || 'mb-4')}>
      <a href={`${explorerBaseUrl}/accounts/${props.children}`} target="_blank" className="block text-gray-400">
        <span className="sm:hidden">{trimHash(props.children || '', 18)}</span>
        <span className="hidden sm:inline">{props.children}</span>
      </a>
      <button onClick={() => clipboard.copy(props.children)}>
        <FontAwesomeIcon icon={faCopy} className="inline-block ml-2 text-gray-400 opacity-80" />
      </button>
    </div>
  )
}
