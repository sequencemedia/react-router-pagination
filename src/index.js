import React from 'react'
import PropTypes from 'prop-types'

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

const Pagination = ({ format, ...props }) => (
  format !== 'center'
    ? <Standard {...props} />
    : <Centered {...props} />
)

Pagination.calculateTotalPages = calculateTotalPages
Pagination.calculatePageNumber = calculatePageNumber

Pagination.propTypes = {
  format: PropTypes.string
}

export default Pagination
