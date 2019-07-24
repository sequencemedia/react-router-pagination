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

export class Standard extends Pagination {
  static calculateTotalPages = calculateTotalPages

  static calculatePageNumber = calculatePageNumber

  state = {
    ...this.state,
    spread: toInteger(this.props.spread)
  }

  z = () => {
    const {
      spread: z
    } = this.state
    return z
  }

  zeroIndex = (pageNumber) => {
    const p = pageNumber - 1
    const z = this.z()
    return (p - (p % z))
  }

  lastIndex = (pageNumber, totalPages) => {
    const p = pageNumber - 1
    const z = this.z()
    return Math.min((p - (p % z)) + z, totalPages)
  }

  componentWillReceiveProps ({ spread, ...props }) {
    super.componentWillReceiveProps(props)
    this.setState({ spread: toInteger(spread) })
  }

  shouldComponentUpdate (props) {
    return super.shouldComponentUpdate(props) || (props.spread !== this.props.spread)
  }
}

Standard.propTypes = {
  ...Pagination.propTypes,
  spread: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
}

Standard.defaultProps = {
  ...Pagination.defaultProps,
  spread: 1
}
