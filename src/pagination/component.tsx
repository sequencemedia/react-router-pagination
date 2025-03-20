/**
 * Pagination component
 */
import {
  toInteger,
  calculateTotalPages,
  calculatePageNumber
} from '#pagination/pagination/common'

import AbstractPagination from '../super/pagination/component.tsx'

export {
  toInteger,
  calculateTotalPages,
  calculatePageNumber
}

type AbstractPaginationProps = ReactRouterPaginationTypes.AbstractPaginationProps

type AbstractPaginationState = ReactRouterPaginationTypes.AbstractPaginationState

export class Pagination extends AbstractPagination<AbstractPaginationProps, AbstractPaginationState> {
  state = {
    pageNumber: toInteger(this.props.pageNumber),
    totalPages: toInteger(this.props.totalPages)
  }
}
