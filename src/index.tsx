import React from 'react'

import AbstractPagination, {
  type AbstractPaginationProps,
  type AbstractPaginationState
} from './pagination/component.tsx'

import {
  Standard
} from './pagination/standard/index.tsx'

import {
  Centered
} from './pagination/centered/index.tsx'

import {
  toInteger
} from './pagination/common/index.mts'

export interface PaginationProps extends AbstractPaginationProps {
  format?: string
}

export default class Pagination extends AbstractPagination<PaginationProps, AbstractPaginationState> {
  state = {
    pageNumber: toInteger(this.props.pageNumber),
    totalPages: toInteger(this.props.totalPages)
  }

  render (): JSX.Element {
    const { format, ...props }: PaginationProps = this.props

    return (
      format !== 'center'
        ? <Standard {...props} />
        : <Centered {...props} />
    )
  }
}
