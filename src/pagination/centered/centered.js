import React from 'react' // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'
import Pagination, {
  pagination
} from '../prototype/pagination'

export {
  pagination
}

export class Centered extends Pagination {
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
    } = this.props
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

  shouldComponentUpdate (props) {
    return super.shouldComponentUpdate(props) || (props.spread !== this.props.spread)
  }
}

Centered.propTypes = {
  ...Pagination.propTypes,
  spread: PropTypes.number.isRequired
}

Centered.defaultProps = {
  ...Pagination.defaultProps,
  spread: 3
}
