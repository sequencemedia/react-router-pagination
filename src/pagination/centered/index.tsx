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

interface CenteredProps extends PaginationProps {
  spread: string | number
}

interface CenteredState extends PaginationState {
  spread: number
}

export class Centered extends Pagination<CenteredProps, CenteredState> {
  static defaultProps = {
    ...Pagination.defaultProps,
    spread: 3
  }

  static calculateTotalPages = calculateTotalPages

  static calculatePageNumber = calculatePageNumber

  state = {
    pageNumber: toInteger(this.props.pageNumber),
    totalPages: toInteger(this.props.totalPages),
    spread: toInteger(this.props.spread)
  }

  x = (): number => (
    Math.ceil(
      this.z() / 2
    )
  )

  y = (): number => (
    Math.floor(
      this.z() / 2
    )
  )

  z = (): number => {
    const {
      spread: z
    } = this.state
    const s = Boolean(z % 2) // !!(z % 2)
    return (s) ? z : z - 1
  }

  zeroIndex = (pageNumber: string | number, totalPages: string | number): number => {
    const p = toInteger(pageNumber)
    const t = toInteger(totalPages)

    const x = this.x()
    const z = this.z()
    const y = this.y()
    return (p > x) ? (t > z) ? ((p + y) > t) ? t - z : (t > (p + y)) ? p - x : t - z : 0 : 0
  }

  lastIndex = (pageNumber: string | number, totalPages: string | number): number => {
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
}
