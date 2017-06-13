import React from 'react' // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'
import Pagination, {
  pagination
} from '../prototype/pagination'

export {
  pagination
}

export class Standard extends Pagination {
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
