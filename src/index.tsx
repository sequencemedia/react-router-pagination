import React from 'react'

import {
  Standard
} from 'react-router-pagination/pagination/standard'

import {
  Centered
} from 'react-router-pagination/pagination/centered'

import {
  calculateTotalPages,
  calculatePageNumber
} from 'react-router-pagination/pagination'

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
