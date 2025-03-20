/**
 * Pagination component
 */
import type { JSX } from 'react'
import React, { Component } from 'react'

import {
  Link,
  generatePath
} from 'react-router'

import {
  toInteger,
  calculateTotalPages,
  calculatePageNumber
} from '#pagination/super/pagination/common'

const getListItemClassName = (currentPageNumber: string | number, pageNumber: string | number): string => (
  toInteger(currentPageNumber) === toInteger(pageNumber)
    ? 'current-page'
    : 'page'
)

const getListItemKey = (key: string | number): string => `list-item-${key}`

const getLinkTo = ({ path = '/:pageNumber', params = {} } = {}, pageNumber = 0): string => generatePath(path, { ...params, pageNumber })

export type AbstractPaginationProps = ReactRouterPaginationTypes.AbstractPaginationProps

export type AbstractPaginationState = ReactRouterPaginationTypes.AbstractPaginationState

export abstract class AbstractPagination<P, S> extends Component<P & AbstractPaginationProps, S & AbstractPaginationState> { // eslint-disable-line @typescript-eslint/no-unnecessary-type-parameters -- Base
  static defaultProps = {
    onClick () {},
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

  zeroIndex (pageNumber: string | number, totalPages: string | number): number { // eslint-disable-line no-unused-vars -- Base
    return 0
  }

  lastIndex (pageNumber: string | number, totalPages: string | number): number { // eslint-disable-line no-unused-vars -- Base
    return 0
  }

  hasReversePageLink (pageNumber: string | number, totalPages: string | number): boolean {
    return (this.zeroIndex(pageNumber, totalPages) - 1) > 0
  }

  hasForwardPageLink (pageNumber: string | number, totalPages: string | number): boolean {
    const i = Number(pageNumber)
    const j = Number(totalPages)
    return (this.lastIndex(i, j) + 1) < j
  }

  hasZeroPageLink (pageNumber: string | number, totalPages: string | number): boolean {
    const i = Number(pageNumber)
    const j = Number(totalPages)
    return this.zeroIndex(i, j) > 0
  }

  hasLastPageLink (pageNumber: string | number, totalPages: string | number): boolean {
    const i = Number(pageNumber)
    const j = Number(totalPages)
    return this.lastIndex(i, j) < j
  }

  reversePageLinkItem (match: object, pageNumber: string | number, totalPages: string | number): JSX.Element | null {
    if (this.hasReversePageLink(pageNumber, totalPages)) {
      const n = this.zeroIndex(pageNumber, totalPages)
      return (
        <li key={getListItemKey('reverse')} className='reverse-page'>
          <Link to={getLinkTo(match, n)} onClick={() => { this.handlePageNumberSelect(n) }}>
            <span className='reverse'>
              {'\u2039'}
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
        <li key={getListItemKey('forward')} className='forward-page'>
          <Link to={getLinkTo(match, n)} onClick={() => { this.handlePageNumberSelect(n) }}>
            <span className='forward'>
              {'\u203A'}
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
        <li key={getListItemKey(n)} className='zero-page'>
          <Link to={getLinkTo(match, n)} onClick={() => { this.handlePageNumberSelect(n) }}>
            <span className='page-number'>
              1
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
        <li key={getListItemKey(n)} className='last-page'>
          <Link to={getLinkTo(match, n)} onClick={() => { this.handlePageNumberSelect(n) }}>
            <span className='page-number'>
              {String(n)}
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
      a.push(
        <li key={getListItemKey(n)} className={getListItemClassName(pageNumber, n)}>
          <Link to={getLinkTo(match, n)} onClick={() => { this.handlePageNumberSelect(n) }}>
            <span className='page-number'>
              {String(n)}
            </span>
          </Link>
        </li>
      )
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
      props.match !== this.props.match
    )
  }

  handlePageNumberSelect = (pageNumber: number): void => {
    this.props.onClick(pageNumber)
  }

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
      }

      return (
        <ul className='pagination'>
          {this.pageLinkItems(match, page, totalPages)}
        </ul>
      )
    }
    return null
  }
}
