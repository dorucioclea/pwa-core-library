import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { handleAppResponse, IAppResponse } from '../services/http'
import InfiniteScrollComponent from 'react-infinite-scroll-component'
import React, { useState, useEffect, ReactNode, useRef } from 'react'

type Props<T> = {
  onLoadItems: (page: number, sessionId: string | null) => Promise<IAppResponse<T[]>>
  onLoadMetaDataChange?: (meta: any) => void
  content: (items: T[], isLoading: boolean, statusCode: number | null) => ReactNode
  refreshObserver?: any
}

export const InfiniteScroll = <T extends any>(props: Props<T>) => {
  const [items, setItems] = useState<T[]>([])
  const [page, setPage] = useState(1)
  const [hasReachedEnd, setHasReachedEnd] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorStatusCode, setErrorStatusCode] = useState<number | null>(null)
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null)
  const isInitialMount = useRef(true)

  useEffect(() => {
    loadItems(page)
  }, [page])

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      hardrefresh()
    }
  }, [props.refreshObserver])

  const hardrefresh = () => {
    setItems([])
    setIsLoading(true)
    setHasReachedEnd(false)

    if (page === 1) loadItems(1)

    setPage(1)
  }

  const loadItems = async (withPage: number) => {
    if (items.length < 1 && !isLoading) {
      setIsLoading(true)
    }

    handleAppResponse(
      props.onLoadItems(withPage, currentSessionId),
      (items, meta) => {
        setIsLoading(false)
        setCurrentSessionId(null)

        if (meta?.sessionId) {
          setCurrentSessionId(meta.sessionId)
          delete meta.sessionId
        }

        if (meta && Object.keys(meta).length > 0 && props.onLoadMetaDataChange) {
          props.onLoadMetaDataChange(meta)
        }

        if (!items || items.length < 1) {
          setHasReachedEnd(true)
          return
        }

        setItems((currentItems) => [...currentItems, ...items])
      },
      (_, statusCode) => setErrorStatusCode(statusCode)
    )
  }

  return (
    <InfiniteScrollComponent
      dataLength={items.length}
      next={() => setPage((currentPage) => currentPage + 1)}
      hasMore={!hasReachedEnd}
      loader={null}
      endMessage={
        items.length > 1 ? (
          <div className="flex justify-center">
            <FontAwesomeIcon icon={faCheckCircle} className="text-blue-500 opacity-75" size="2x" />
          </div>
        ) : undefined
      }
    >
      {props.content(items, isLoading, errorStatusCode)}
    </InfiniteScrollComponent>
  )
}
