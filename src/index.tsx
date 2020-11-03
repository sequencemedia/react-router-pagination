import React from 'react'

import {
  Standard
} from './pagination/standard'

import {
  Centered
} from './pagination/centered'

import {
  calculateTotalPages,
  calculatePageNumber
} from './pagination/common'

export {
  Standard,
  Centered
}

export interface PaginationProps {
  format?: string
}

const Pagination = ({ format, ...props }: PaginationProps): JSX.Element => (
  format !== 'center'
    ? <Standard {...props} />
    : <Centered {...props} />
)

Pagination.calculateTotalPages = calculateTotalPages
Pagination.calculatePageNumber = calculatePageNumber

export default Pagination
