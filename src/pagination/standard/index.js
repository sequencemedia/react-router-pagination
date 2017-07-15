import React from 'react' // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'
import Pagination, {
  calculateTotalPages,
  calculatePageNumber
} from '~/src/pagination/prototype'

export class Standard extends Pagination {
  static calculateTotalPages = calculateTotalPages
  static calculatePageNumber = calculatePageNumber

  z = () => this.props.spread

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

  shouldComponentUpdate (props) {
    return super.shouldComponentUpdate(props) || (props.spread !== this.props.spread)
  }
}

Standard.propTypes = {
  ...Pagination.propTypes,
  spread: PropTypes.number.isRequired
}

Standard.defaultProps = {
  ...Pagination.defaultProps,
  spread: 1
}
