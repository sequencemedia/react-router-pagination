/**
 * Pagination component
 */
import React, { Component } from 'react'

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
} from './common'

const getListItemClassName = (currentPageNumber: string | number, pageNumber: string | number): string => (
  toInteger(currentPageNumber) === toInteger(pageNumber)
    ? 'currentPage'
    : 'page'
)

const getListItemKey = (key: string | number): string => `list-item-${key}`

const getLinkTo = ({ path = '/:pageNumber', params = {} } = {}, pageNumber = 0): string => generatePath(path, { ...params, pageNumber })

export {
  toInteger,
  calculateTotalPages,
  calculatePageNumber
}

export interface AbstractPaginationProps {
  onClick: (pageNumber: number) => void
  pageNumber: string | number
  totalPages: string | number
  match: {
    path?: string
    params?: object
  }
}

export interface AbstractPaginationState {
  pageNumber: number
  totalPages: number
}

export default abstract class AbstractPagination<P, S> extends Component<P & AbstractPaginationProps, S & AbstractPaginationState> {
  static defaultProps = {
    onClick: () => {},
    pageNumber: 0,
    totalPages: 0,
    match: {}
  }

  static calculateTotalPages = calculateTotalPages

  static calculatePageNumber = calculatePageNumber

  x (): number {
    return 0
  }

  y (): number {
    return 0
  }

  z (): number {
    return 0
  }

  zeroIndex (pageNumber: string | number, totalPages: string | number): number {
    return 0
  }

  lastIndex (pageNumber: string | number, totalPages: string | number): number {
    return 0
  }

  hasReversePageLink (pageNumber: string | number, totalPages: string | number): boolean {
    return (this.zeroIndex(pageNumber, totalPages) - 1) > 0
  }

  hasForwardPageLink (pageNumber: string | number, totalPages: string | number): boolean {
    return (this.lastIndex(pageNumber, totalPages) + 1) < totalPages
  }

  hasZeroPageLink (pageNumber: string | number, totalPages: string | number): boolean {
    return this.zeroIndex(pageNumber, totalPages) > 0
  }

  hasLastPageLink (pageNumber: string | number, totalPages: string | number): boolean {
    return this.lastIndex(pageNumber, totalPages) < totalPages
  }

  reversePageLinkItem (match: object, pageNumber: string | number, totalPages: string | number): JSX.Element | null {
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

  forwardPageLinkItem (match: object, pageNumber: string | number, totalPages: string | number): JSX.Element | null {
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

  zeroPageLinkItem (match: object, pageNumber: string | number, totalPages: string | number): JSX.Element | null {
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

  lastPageLinkItem (match: object, pageNumber: string | number, totalPages: string | number): JSX.Element | null {
    if (this.hasLastPageLink(pageNumber, totalPages)) {
      const n = toInteger(totalPages)
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

  pageLinkItems (match: object, pageNumber: string | number, totalPages: string | number): JSX.Element[] {
    let i = this.zeroIndex(pageNumber, totalPages)
    const j = this.lastIndex(pageNumber, totalPages)
    const a = []
    for (j; i < j; i = i + 1) {
      const n = (i + 1)
      a.push((
        <li key={getListItemKey(n)} className={getListItemClassName(pageNumber, n)}>
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

  static getDerivedStateFromProps ({ pageNumber, totalPages }: AbstractPaginationProps): AbstractPaginationState {
    return {
      pageNumber: toInteger(pageNumber),
      totalPages: toInteger(totalPages)
    }
  }

  shouldComponentUpdate (props: AbstractPaginationProps): boolean {
    return (
      toInteger(props.pageNumber) !== toInteger(this.props.pageNumber) ||
      toInteger(props.totalPages) !== toInteger(this.props.totalPages) ||
      props.match !== this.props.match)
  }

  handleClick = (pageNumber: number): any => this.props.onClick(pageNumber)

  render (): JSX.Element | null {
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

export class Pagination extends AbstractPagination<AbstractPaginationProps, AbstractPaginationState> {
  state = {
    pageNumber: toInteger(this.props.pageNumber),
    totalPages: toInteger(this.props.totalPages)
  }
}
