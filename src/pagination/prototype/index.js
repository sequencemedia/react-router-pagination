/**
 * Pagination component
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Link
} from 'react-router'

export const toInteger = (v) => isNaN(v) ? 0 : parseInt(v, 10)

function currentPageClassName (pageNumber, currentPageNumber) {
  if (pageNumber === currentPageNumber) return 'currentPage'
}

const pageKey = (currentPageKey) => `pagination-${currentPageKey}`
const pageLinkPath = (path, currentPageNumber) => `${path}/${currentPageNumber}`

export function calculateTotalPages (totalItemsInCollection, itemsPerPage) {
  const e = toInteger(totalItemsInCollection)
  const p = toInteger(itemsPerPage)
  const r = !!(e % p)
  const l = Math.floor(e / p)
  return (r) ? l + 1 : l
}

export function calculatePageNumber (pageNumber, totalPages) {
  const p = toInteger(pageNumber)
  const t = toInteger(totalPages)
  return Math.max(1, Math.min(p, t))
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

  reversePageLinkItem (path, pageNumber, totalPages) {
    if (this.hasReversePageLink(pageNumber, totalPages)) {
      const n = this.zeroIndex(pageNumber, totalPages)
      return (
        <li key={pageKey('reverse')} className='reversePage'>
          <Link to={pageLinkPath(path, n)} onClick={() => this.handleClick(n)}>
            <span className='reverse'>
              {'\u00AB'}
            </span>
          </Link>
        </li>
      )
    }
    return null
  }

  forwardPageLinkItem (path, pageNumber, totalPages) {
    if (this.hasForwardPageLink(pageNumber, totalPages)) {
      const n = this.lastIndex(pageNumber, totalPages) + 1
      return (
        <li key={pageKey('forward')} className='forwardPage'>
          <Link to={pageLinkPath(path, n)} onClick={() => this.handleClick(n)}>
            <span className='forwardPage'>
              {'\u00BB'}
            </span>
          </Link>
        </li>
      )
    }
    return null
  }

  zeroPageLinkItem (path, pageNumber, totalPages) {
    if (this.hasZeroPageLink(pageNumber, totalPages)) {
      const n = 1
      return (
        <li key={pageKey(n)} className='zeroPage'>
          <Link to={pageLinkPath(path, n)} onClick={() => this.handleClick(n)}>
            <span className='pageNumber'>
              {n}
            </span>
          </Link>
        </li>
      )
    }
    return null
  }

  lastPageLinkItem (path, pageNumber, totalPages) {
    if (this.hasLastPageLink(pageNumber, totalPages)) {
      const n = totalPages
      return (
        <li key={pageKey(n)} className='lastPage'>
          <Link to={pageLinkPath(path, n)} onClick={() => this.handleClick(n)}>
            <span className='pageNumber'>
              {n}
            </span>
          </Link>
        </li>
      )
    }
    return null
  }

  pageLinkItems (path, pageNumber, totalPages) {
    let i = this.zeroIndex(pageNumber, totalPages)
    const j = this.lastIndex(pageNumber, totalPages)
    const a = []
    for (i, j; i < j; i = i + 1) {
      const n = (i + 1)
      a.push((
        <li key={pageKey(n)} className={currentPageClassName(pageNumber, n)}>
          <Link to={pageLinkPath(path, n)} onClick={() => this.handleClick(n)}>
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
      (props.path !== this.props.path))
  }

  handleClick = (pageNumber) => this.props.onClick(pageNumber)

  render () {
    const { totalPages } = this.state
    if (totalPages > 1) {
      const { path } = this.props
      const { pageNumber } = this.state
      const page = calculatePageNumber(pageNumber, totalPages)
      if (totalPages > this.z()) {
        return (
          <ul className='pagination'>
            {this.zeroPageLinkItem(path, page, totalPages)}
            {this.reversePageLinkItem(path, page, totalPages)}
            {this.pageLinkItems(path, page, totalPages)}
            {this.forwardPageLinkItem(path, page, totalPages)}
            {this.lastPageLinkItem(path, page, totalPages)}
          </ul>
        )
      } else {
        return (
          <ul className='pagination'>
            {this.pageLinkItems(path, page, totalPages)}
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
  path: PropTypes.string,
  totalPages: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
}

Pagination.defaultProps = {
  onClick: () => {},
  pageNumber: 0,
  path: '',
  totalPages: 0
}
