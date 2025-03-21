import debug from 'debug'

import {
  toInteger,
  calculateTotalPages,
  calculatePageNumber
} from '#pagination/pagination/common'

import {
  AbstractPagination
} from '#pagination/super/pagination/component' // '../../super/pagination/component.tsx'

const error = debug('react-router-pagination/pagination/component')

export {
  toInteger,
  calculateTotalPages,
  calculatePageNumber
}

type StandardProps = ReactRouterPaginationTypes.StandardProps

type StandardState = ReactRouterPaginationTypes.StandardState

export class Standard extends AbstractPagination<StandardProps, StandardState> {
  static defaultProps = {
    ...AbstractPagination.defaultProps,
    spread: 1,
    onChange () {}
  }

  state = {
    pageNumber: toInteger(this.props.pageNumber),
    totalPages: toInteger(this.props.totalPages),
    spread: toInteger(this.props.spread)
  }

  z (): number {
    const {
      spread: z
    } = this.state
    return z
  }

  zeroIndex (pageNumber: string | number): number {
    const p = toInteger(pageNumber) - 1
    const z = this.z()
    return (p - (p % z))
  }

  lastIndex (pageNumber: string | number, totalPages: string | number): number {
    const p = toInteger(pageNumber) - 1
    const z = this.z()
    return Math.min((p - (p % z)) + z, toInteger(totalPages))
  }

  static getDerivedStateFromProps ({ pageNumber, totalPages, spread }: StandardProps): StandardState {
    return {
      pageNumber: toInteger(pageNumber),
      totalPages: toInteger(totalPages),
      spread: toInteger(spread)
    }
  }

  shouldComponentUpdate (props: StandardProps): boolean {
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
