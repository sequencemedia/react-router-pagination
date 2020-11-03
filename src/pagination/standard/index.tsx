import AbstractPagination, {
  AbstractPaginationProps,
  AbstractPaginationState,
  toInteger,
  calculateTotalPages,
  calculatePageNumber
} from 'react-router-pagination/pagination/component'

export {
  toInteger,
  calculateTotalPages,
  calculatePageNumber
}

interface StandardProps extends AbstractPaginationProps {
  spread: string | number
}

interface StandardState extends AbstractPaginationState {
  spread: number
}

export class Standard extends AbstractPagination<StandardProps, StandardState> {
  static defaultProps = {
    ...AbstractPagination.defaultProps,
    spread: 1
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
}
