import Pagination, {
  PaginationProps,
  PaginationState,
  toInteger,
  calculateTotalPages,
  calculatePageNumber
} from 'react-router-pagination/pagination/component'

export {
  toInteger,
  calculateTotalPages,
  calculatePageNumber
}

interface StandardProps extends PaginationProps {
  spread: string | number
}

interface StandardState extends PaginationState {
  spread: number
}

export class Standard extends Pagination<StandardProps, StandardState> {
  static defaultProps = {
    ...Pagination.defaultProps,
    spread: 1
  }

  static calculateTotalPages = calculateTotalPages

  static calculatePageNumber = calculatePageNumber

  state = {
    pageNumber: toInteger(this.props.pageNumber),
    totalPages: toInteger(this.props.totalPages),
    spread: toInteger(this.props.spread)
  }

  z = (): number => {
    const {
      spread: z
    } = this.state
    return z
  }

  zeroIndex = (pageNumber: number): number => {
    const p = pageNumber - 1
    const z = this.z()
    return (p - (p % z))
  }

  lastIndex = (pageNumber: number, totalPages: number): number => {
    const p = pageNumber - 1
    const z = this.z()
    return Math.min((p - (p % z)) + z, totalPages)
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
