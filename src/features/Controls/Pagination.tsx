import React from 'react'
import ReactPaginate from 'react-paginate'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
  current: number
  total: number
  onPageChangeRequest: (page: number) => void
}

export const Pagination = (props: Props) => (
  <div>
    <ReactPaginate
      marginPagesDisplayed={2}
      breakLabel="..."
      nextLabel={
        <span>
          Next
          <FontAwesomeIcon icon={faAngleRight} size="lg" className="inline-block ml-2" />
        </span>
      }
      onPageChange={(e) => props.onPageChangeRequest(e.selected)}
      pageRangeDisplayed={3}
      pageCount={props.total}
      previousLabel={
        <span>
          <FontAwesomeIcon icon={faAngleLeft} size="lg" className="inline-block mr-2" />
          Previous
        </span>
      }
      containerClassName="px-4 flex items-center justify-between sm:px-0 max-w-2xl mx-auto"
      activeClassName="border-primary-500 text-primary-600"
      pageClassName="border-t-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
      pageLinkClassName="inline-flex items-center text-lg pt-4 px-4"
      nextClassName="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-gray-500 hover:text-gray-700 hover:border-gray-300"
      previousClassName="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-gray-500 hover:text-gray-700 hover:border-gray-300"
      breakClassName="border-transparent text-gray-500 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
    />
  </div>
)
