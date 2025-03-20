import type { JSX } from 'react'
import React, { Component } from 'react'

import {
  Standard
} from './pagination/standard/index.tsx'

import {
  Centered
} from './pagination/centered/index.tsx'

import {
  calculateTotalPages,
  calculatePageNumber
} from './pagination/common/index.mts'

type PaginationProps = ReactRouterPaginationTypes.PaginationProps

export default class Pagination extends Component<PaginationProps> {
  static calculateTotalPages = calculateTotalPages
  static calculatePageNumber = calculatePageNumber

  render (): JSX.Element {
    const { format, ...props }: PaginationProps = this.props

    return (
      format !== 'center'
        ? <Standard {...props} />
        : <Centered {...props} />
    )
  }
}
