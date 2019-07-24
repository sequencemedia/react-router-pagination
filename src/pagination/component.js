/**
 * Pagination component
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  generatePath
} from 'react-router'

import {
  Link
} from 'react-router-dom'

import {
  toInteger,
  calculateTotalPages,
  calculatePageNumber
} from 'react-router-pagination/pagination'

function currentPageClassName (pageNumber, currentPageNumber) {
  if (pageNumber === currentPageNumber) return 'currentPage'
}

const getListItemKey = (key) => `list-item-${key}`
const getLinkTo = ({ path = '/:pageNumber', params = {} } = {}, pageNumber) => generatePath(path, { ...params, pageNumber })

export {
  toInteger,
  calculateTotalPages,
  calculatePageNumber
}

export default class Pagination extends Component {
  static calculateTotalPages = calculateTotalPages

  static calculatePageNumber = calculatePageNumber

  state = {
    pageNumber: toInteger(this.props.pageNumber),
    totalPages: toInteger(this.props.totalPages)
  }

  x () {
    return 0
  }

  y () {
    return 0
  }

  z () {
    return 0
  }

  zeroIndex () {
    return 0
  }

  lastIndex () {
    return 0
  }

  hasReversePageLink (pageNumber, totalPages) {
    return (this.zeroIndex(pageNumber, totalPages) - 1) > 0
  }

  hasForwardPageLink (pageNumber, totalPages) {
    return (this.lastIndex(pageNumber, totalPages) + 1) < totalPages
  }

  hasZeroPageLink (pageNumber, totalPages) {
    return this.zeroIndex(pageNumber, totalPages) > 0
  }

  hasLastPageLink (pageNumber, totalPages) {
    return this.lastIndex(pageNumber, totalPages) < totalPages
  }

  reversePageLinkItem (match, pageNumber, totalPages) {
    if (this.hasReversePageLink(pageNumber, totalPages)) {
      const n = this.zeroIndex(pageNumber, totalPages)
      return (
        <li key={getListItemKey('reverse')} className='reversePage'>
          <Link to={getLinkTo(match, n)} onClick={() => this.handleClick(n)}>
            <span className='reverse'>
              {'\u00AB'}
            </span>
          </Link>
        </li>
      )
    }
    return null
  }

  forwardPageLinkItem (match, pageNumber, totalPages) {
    if (this.hasForwardPageLink(pageNumber, totalPages)) {
      const n = this.lastIndex(pageNumber, totalPages) + 1
      return (
        <li key={getListItemKey('forward')} className='forwardPage'>
          <Link to={getLinkTo(match, n)} onClick={() => this.handleClick(n)}>
            <span className='forwardPage'>
              {'\u00BB'}
            </span>
          </Link>
        </li>
      )
    }
    return null
  }

  zeroPageLinkItem (match, pageNumber, totalPages) {
    if (this.hasZeroPageLink(pageNumber, totalPages)) {
      const n = 1
      return (
        <li key={getListItemKey(n)} className='zeroPage'>
          <Link to={getLinkTo(match, n)} onClick={() => this.handleClick(n)}>
            <span className='pageNumber'>
              {n}
            </span>
          </Link>
        </li>
      )
    }
    return null
  }

  lastPageLinkItem (match, pageNumber, totalPages) {
    if (this.hasLastPageLink(pageNumber, totalPages)) {
      const n = totalPages
      return (
        <li key={getListItemKey(n)} className='lastPage'>
          <Link to={getLinkTo(match, n)} onClick={() => this.handleClick(n)}>
            <span className='pageNumber'>
              {n}
            </span>
          </Link>
        </li>
      )
    }
    return null
  }

  pageLinkItems (match, pageNumber, totalPages) {
    let i = this.zeroIndex(pageNumber, totalPages)
    const j = this.lastIndex(pageNumber, totalPages)
    const a = []
    for (i, j; i < j; i = i + 1) {
      const n = (i + 1)
      a.push((
        <li key={getListItemKey(n)} className={currentPageClassName(pageNumber, n)}>
          <Link to={getLinkTo(match, n)} onClick={() => this.handleClick(n)}>
            <span className='pageNumber'>
              {n}
            </span>
          </Link>
        </li>
      ))
    }
    return a
  }

  componentWillReceiveProps ({ pageNumber, totalPages }) {
    this.setState({
      pageNumber: toInteger(pageNumber),
      totalPages: toInteger(totalPages)
    })
  }

  shouldComponentUpdate (props) {
    return (
      (props.pageNumber !== this.props.pageNumber) ||
      (props.totalPages !== this.props.totalPages) ||
      (props.match !== this.props.match))
  }

  handleClick = (pageNumber) => this.props.onClick(pageNumber)

  render () {
    const { totalPages } = this.state
    if (totalPages > 1) {
      const { match } = this.props
      const { pageNumber } = this.state
      const page = calculatePageNumber(pageNumber, totalPages)
      if (totalPages > this.z()) {
        return (
          <ul className='pagination'>
            {this.zeroPageLinkItem(match, page, totalPages)}
            {this.reversePageLinkItem(match, page, totalPages)}
            {this.pageLinkItems(match, page, totalPages)}
            {this.forwardPageLinkItem(match, page, totalPages)}
            {this.lastPageLinkItem(match, page, totalPages)}
          </ul>
        )
      } else {
        return (
          <ul className='pagination'>
            {this.pageLinkItems(match, page, totalPages)}
          </ul>
        )
      }
    }
    return null
  }
}

Pagination.propTypes = {
  onClick: PropTypes.func,
  pageNumber: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  totalPages: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape()
  })
}

Pagination.defaultProps = {
  onClick: () => {},
  pageNumber: 0,
  totalPages: 0,
  match: {}
}
