/**
 * Pagination component
 */
import React from 'react'
import { Link } from 'react-router'

function currentPageClassName(pageNumber, currentPageNumber) {
  if (pageNumber === currentPageNumber) return 'currentPage';
}

function paginationKey(pageNumber) {
  return `paginator-${pageNumber}`;
}

function paginationLinkPath(path, currentPageNumber) {
  return `${path}/${currentPageNumber}`;
}

function calculateTotalPages(extent, pageSize) {
  const r = extent % pageSize;
  const l = Math.floor(extent / pageSize);
  return (!!r) ? l + 1 : l;
}

function calculatePageNumber(pageNumber, totalPages) {
  return Math.max(1, Math.min(pageNumber, totalPages));
}

const paginator = {
  calculateTotalPages,
  calculatePageNumber
}

export { paginator };

export default class Paginator extends React.Component {

  handleClick = (pageNumber) => {
    this.props.onClick(pageNumber);
  }

  x = () => (this.props.gutter + 1)
  y = () => (this.props.gutter)
  z = () => {
    const z = (this.x() + this.y())
    return (this.props.gutter % 2 ? z : z + 1);
  }

  zeroIndex = (pageNumber, totalPages) => {
    const x = this.x();
    const y = this.y();
    const z = this.z();
    return (pageNumber > x) ? (totalPages > z) ? ((pageNumber + y) > totalPages) ? totalPages - z : (totalPages > (pageNumber + y)) ? pageNumber - x : totalPages - z : 0 : 0 ;
    /*
    return (pageNumber > 3) ? (totalPages > 6) ? ((pageNumber + 2) > totalPages) ? totalPages - 6 : (totalPages > (pageNumber + 2)) ? pageNumber - 3 : totalPages - 6 : 0 : 0 ;
    */
  }

  lastIndex = (pageNumber, totalPages) => {
    const x = this.x();
    const y = this.y();
    const z = this.z();
    return (pageNumber > x) ? (totalPages > z) ? ((pageNumber + y) > totalPages) ? totalPages : pageNumber + y : totalPages : (totalPages > z) ? z : totalPages ;
    /*
    return (pageNumber > 3) ? (totalPages > 6) ? ((pageNumber + 2) > totalPages) ? totalPages : pageNumber + 2 : totalPages : (totalPages > 6) ? 6 : totalPages ;
    */
  }

  hasZeroPageLink = (pageNumber) => {
    return (pageNumber - this.x()) > 0 ;
    /*
    return (pageNumber - 3) > 0 ;
    */
  }

  hasLastPageLink = (pageNumber, totalPages) => {
    return pageNumber < (totalPages - this.y()) ;
    /*
    return pageNumber < (totalPages - 2) ;
    */
  }

  zeroPageLinkItem = (path, pageNumber) => {
    if (this.hasZeroPageLink(pageNumber)) return (
        <li key={paginationKey(1)} className={'zeroPage'}>
          <Link to={paginationLinkPath(path, 1)} onClick={() => this.handleClick(1)}>
            <span className={'pageNumber'}>1</span>
          </Link>
        </li>) ;
  }

  lastPageLinkItem = (path, pageNumber, totalPages) => {
    if (this.hasLastPageLink(pageNumber, totalPages)) return (
      <li key={paginationKey(totalPages)} className={'lastPage'}>
        <Link to={paginationLinkPath(path, totalPages)} onClick={() => this.handleClick(totalPages)}>
          <span className={'pageNumber'}>{totalPages}</span>
        </Link>
      </li>) ;
  }

  pageLinkItems = (path, pageNumber, totalPages) => {
    let i = this.zeroIndex(pageNumber, totalPages);
    let j = this.lastIndex(pageNumber, totalPages);
    const a = [];
    for (i, j; i < j; i = i + 1) {
      let n = (i + 1);
      a.push((
        <li key={paginationKey(n)} className={currentPageClassName(pageNumber, n)}>
          <Link to={paginationLinkPath(path, n)} onClick={() => this.handleClick(n)}>
            <span className={'pageNumber'}>{n}</span>
          </Link>
        </li>));
    }
    return a ;
  }

  shouldComponentUpdate(props) {
    return (
      (props.pageNumber !== this.props.pageNumber) ||
      (props.totalPages !== this.props.totalPages) ||
      (props.gutter !== this.props.gutter) ||
      (props.path !== this.props.path));
  }

  render () {

    const totalPages = this.props.totalPages;
    if (totalPages > 1) {
      const path = this.props.path;
      const pageNumber = calculatePageNumber(this.props.pageNumber, totalPages);
      if (totalPages > this.z()) {
        return (
          <ul className={'paginator'}>
            {this.zeroPageLinkItem(path, pageNumber)}
            {this.pageLinkItems(path, pageNumber, totalPages)}
            {this.lastPageLinkItem(path, pageNumber, totalPages)}
          </ul>
        )
      } else {
        return (
          <ul className={'paginator'}>
            {this.pageLinkItems(path, pageNumber, totalPages)}
          </ul>
        )
      }
    }
    return null ;

  }
}

Paginator.propTypes = {
  onClick: React.PropTypes.func,
  pageNumber: React.PropTypes.number.isRequired,
  path: React.PropTypes.string,
  totalPages: React.PropTypes.number.isRequired,
  gutter: React.PropTypes.number
}

Paginator.defaultProps = {
  onClick: () => { /* no op */ },
  pageNumber: 0,
  path: '',
  totalPages: 0,
  gutter: 2
}
