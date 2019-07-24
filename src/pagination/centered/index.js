import React from 'react'
import PropTypes from 'prop-types'

import Pagination, {
  toInteger,
  calculateTotalPages,
  calculatePageNumber
} from 'react-router-pagination/pagination/component'

export {
  toInteger,
  calculateTotalPages,
  calculatePageNumber
}

export class Centered extends Pagination {
  static calculateTotalPages = calculateTotalPages

  static calculatePageNumber = calculatePageNumber

  state = {
    ...this.state,
    spread: toInteger(this.props.spread)
  }

  x = () => (
    Math.ceil(
      this.z() / 2
    )
  )

  y = () => (
    Math.floor(
      this.z() / 2
    )
  )

  z = () => {
    const {
      spread: z
    } = this.state
    return z % 2 ? z : z - 1
  }

  zeroIndex = (pageNumber, totalPages) => {
    const x = this.x()
    const z = this.z()
    const y = this.y()
    return (pageNumber > x) ? (totalPages > z) ? ((pageNumber + y) > totalPages) ? totalPages - z : (totalPages > (pageNumber + y)) ? pageNumber - x : totalPages - z : 0 : 0
  }

  lastIndex = (pageNumber, totalPages) => {
    const x = this.x()
    const z = this.z()
    const y = this.y()
    return (pageNumber > x) ? (totalPages > z) ? ((pageNumber + y) > totalPages) ? totalPages : pageNumber + y : totalPages : (totalPages > z) ? z : totalPages
  }

  componentWillReceiveProps ({ spread, ...props }) {
    super.componentWillReceiveProps(props)
    this.setState({ spread: toInteger(spread) })
  }

  shouldComponentUpdate (props) {
    return super.shouldComponentUpdate(props) || (props.spread !== this.props.spread)
  }
}

Centered.propTypes = {
  ...Pagination.propTypes,
  spread: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
}

Centered.defaultProps = {
  ...Pagination.defaultProps,
  spread: 3
}
