
import React from 'react'
import Pagination, { pagination } from '../prototype/pagination'

export { pagination }

export class Centered extends Pagination {

  x = () => Math.ceil(this.props.spread / 2)
  y = () => Math.floor(this.props.spread / 2)
  z = () => this.props.spread

  zeroIndex = (pageNumber, totalPages) => {
    const x = this.x()
    const y = this.y()
    const z = this.z()
    return (pageNumber > x) ? (totalPages > z) ? ((pageNumber + y) > totalPages) ? totalPages - z : (totalPages > (pageNumber + y)) ? pageNumber - x : totalPages - z : 0 : 0
  }

  lastIndex = (pageNumber, totalPages) => {
    const x = this.x()
    const y = this.y()
    const z = this.z()
    return (pageNumber > x) ? (totalPages > z) ? ((pageNumber + y) > totalPages) ? totalPages : pageNumber + y : totalPages : (totalPages > z) ? z : totalPages
  }

  shouldComponentUpdate (props) {
    return super.shouldComponentUpdate(props) || (props.spread !== this.props.spread)
  }

}

Centered.propTypes = {
  ...Pagination.propTypes,
  spread: React.PropTypes.number
}

Centered.defaultProps = {
  ...Pagination.defaultProps,
  spread: 3
}
