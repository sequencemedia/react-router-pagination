declare module 'react-router-pagination' {
  import type { JSX } from 'react'

  export default class Pagination {
    static calculateTotalPages (totalItemsInCollection: number | string, itemsPerPage: number | string): number
    static calculatePageNumber (pageNumber: number | string, totalPages: number | string): number

    render (): JSX.Element
  }
}
