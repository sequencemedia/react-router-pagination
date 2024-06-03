declare namespace ReactRouterPaginationTypes {
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

  export interface CenteredProps extends AbstractPaginationProps {
    spread: string | number
    onChange: (pageNumber: number) => void
  }

  export interface CenteredState extends AbstractPaginationState {
    spread: number
  }

  export interface StandardProps extends AbstractPaginationProps {
    pageNumber: string | number
    totalPages: string | number
    spread: string | number
    onChange: (pageNumber: number) => void
  }

  export interface StandardState extends AbstractPaginationState {
    pageNumber: number
    totalPages: number
    spread: number
  }

  export interface PaginationProps {
    format?: string
  }
}

declare module 'react-router-pagination' {
  import type { JSX } from 'react'

  export default class Pagination {
    static calculateTotalPages (totalItemsInCollection: number | string, itemsPerPage: number | string): number
    static calculatePageNumber (pageNumber: number | string, totalPages: number | string): number

    render (): JSX.Element
  }
}
