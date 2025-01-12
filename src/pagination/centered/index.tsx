import debug from 'debug'

import type ReactRouterPaginationTypes from 'react-router-pagination'

import AbstractPagination, {
  toInteger,
  calculateTotalPages,
  calculatePageNumber
} from '#pagination/component'

const error = debug('react-router-pagination/pagination/component')

export {
  toInteger,
  calculateTotalPages,
  calculatePageNumber
}

type CenteredProps = ReactRouterPaginationTypes.CenteredProps

type CenteredState = ReactRouterPaginationTypes.CenteredState

export class Centered extends AbstractPagination<CenteredProps, CenteredState> {
  static defaultProps = {
    ...AbstractPagination.defaultProps,
    spread: 3,
    onChange ():void {}
  }

  state = {
    pageNumber: toInteger(this.props.pageNumber),
    totalPages: toInteger(this.props.totalPages),
    spread: toInteger(this.props.spread)
  }

  x (): number {
    const n = this.z() / 2
    return Math.ceil(n)
  }

  y (): number {
    const n = this.z() / 2
    return Math.floor(n)
  }

  z (): number {
    const {
      spread: z
    } = this.state
    const s = Boolean(z % 2) // !!(z % 2)
    return (s) ? z : z - 1
  }

  zeroIndex (pageNumber: string | number, totalPages: string | number): number {
    const p = toInteger(pageNumber)
    const t = toInteger(totalPages)
    const x = this.x()
    const z = this.z()
    const y = this.y()
    return (p > x) ? (t > z) ? ((p + y) > t) ? t - z : (t > (p + y)) ? p - x : t - z : 0 : 0
  }

  lastIndex (pageNumber: string | number, totalPages: string | number): number {
    const p = toInteger(pageNumber)
    const t = toInteger(totalPages)
    const x = this.x()
    const z = this.z()
    const y = this.y()
    return (p > x) ? (t > z) ? ((p + y) > t) ? t : p + y : t : (t > z) ? z : t
  }

  static getDerivedStateFromProps ({ pageNumber, totalPages, spread }: CenteredProps): CenteredState {
    return {
      pageNumber: toInteger(pageNumber),
      totalPages: toInteger(totalPages),
      spread: toInteger(spread)
    }
  }

  shouldComponentUpdate (props: CenteredProps): boolean {
    return super.shouldComponentUpdate(props) || (props.spread !== this.props.spread)
  }

  handlePageNumberSelect = (pageNumber: number): void => {
    const { onClick } = this.props

    try {
      onClick(pageNumber)
    } catch {
      error('Error `onClick`')
    }

    if (pageNumber !== this.state.pageNumber) {
      this.setState({ pageNumber }, () => {
        const { onChange } = this.props

        try {
          onChange(pageNumber)
        } catch {
          error('Error `onChange`')
        }
      })
    }
  }
}
