import React from 'react' // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'
import Pagination, {
  toInteger,
  calculateTotalPages,
  calculatePageNumber
} from '~/src/pagination/prototype'

export class Standard extends Pagination {
  static calculateTotalPages = calculateTotalPages
  static calculatePageNumber = calculatePageNumber

  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      spread: toInteger(this.props.spread)
    }
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

  componentWillReceiveProps (props) {
    super.componentWillReceiveProps(props)
    const { spread } = props
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
