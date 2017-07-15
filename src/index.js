/* eslint react/prop-types: 0 */
import React from 'react'

import {
  calculateTotalPages,
  calculatePageNumber
} from '~/src/pagination/prototype'

import {
  Standard
} from '~/src/pagination/standard'

import {
  Centered
} from '~/src/pagination/centered'

export {
  Standard,
  Centered
}

const Pagination = ({ format, ...props }) => (
  format !== 'center'
    ? <Standard {...props} />
    : <Centered {...props} />
)

Pagination.calculateTotalPages = calculateTotalPages
Pagination.calculatePageNumber = calculatePageNumber

export default Pagination
