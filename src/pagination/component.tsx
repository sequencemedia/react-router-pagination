/**
 * Pagination component
 */
import {
  toInteger,
  calculateTotalPages,
  calculatePageNumber
} from '#pagination/pagination/common'

import AbstractPagination from '#pagination/super/pagination/component' // '../super/pagination/component.tsx'

import type {
  AbstractPaginationProps,
  AbstractPaginationState
} from '#pagination/super/pagination/component'

export {
  toInteger,
  calculateTotalPages,
  calculatePageNumber
}

export class Pagination extends AbstractPagination<AbstractPaginationProps, AbstractPaginationState> {
  state = {
    pageNumber: toInteger(this.props.pageNumber),
    totalPages: toInteger(this.props.totalPages)
  }
}
