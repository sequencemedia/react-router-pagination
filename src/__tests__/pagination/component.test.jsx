import React from 'react'
import PropTypes from 'prop-types'

import {
  toSnapshot
} from 'react-component-snapshot'

import '@testing-library/jest-dom'

import {
  render
} from '@testing-library/react'

import {
  MemoryRouter
} from 'react-router'

import {
  toInteger,
  calculateTotalPages,
  calculatePageNumber,
  Pagination
} from '#pagination/pagination/component'

/**
 *  @param {{ to: string | { pathname: string }, children: React.ReactNode | React.ReactNode[] }} props
 *  @returns {React.JSX.Element}
 */
function MockLink ({ to, children, onClick }) {
  if (typeof to === 'string') {
    return (
      <a
        href={to}
        className='mock-link'
        onClick={onClick}>
        {children}
      </a>
    )
  }

  const {
    pathname
  } = to

  return (
    <a
      href={pathname}
      className='mock-link'
      onClick={onClick}>
      {children}
    </a>
  )
}

MockLink.propTypes = {
  to: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({})
  ]),
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(
      PropTypes.node
    )
  ]),
  onClick: PropTypes.func
}

function MockMemoryRouter ({ children }) {
  return children
}

MockMemoryRouter.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(
      PropTypes.node
    )
  ])
}

/*
jest.mock('react-router', () => {
  return {
    __esModule: true,
    generatePath () {
      return 'MOCK PATH'
    },
    Link: MockLink,
    MemoryRouter: MockMemoryRouter
  }
}) */

describe('react-router-pagination/pagination/component', () => {
  describe('`toInteger`', () => {
    it('is a function', () => {
      expect(toInteger)
        .toEqual(expect.any(Function))
    })
  })

  describe('`calculateTotalPages`', () => {
    it('is a function', () => {
      expect(calculateTotalPages)
        .toEqual(expect.any(Function))
    })
  })

  describe('`calculatePageNumber`', () => {
    it('is a function', () => {
      expect(calculatePageNumber)
        .toEqual(expect.any(Function))
    })
  })

  describe('<Pagination />', () => {
    describe('With `pageNumber` and `totalPages`', () => {
      it('renders', () => {
        expect(toSnapshot(render(
          <MemoryRouter>
            <Pagination pageNumber={1} totalPages={2} />
          </MemoryRouter>
        )))
          .toMatchSnapshot()
      })
    })
  })

  describe('`Pagination.calculateTotalPages()`', () => {
    describe('Your data contains 120 items which you want to display at 10 items per page', () => {
      it('returns 12', () => {
        expect(Pagination.calculateTotalPages(120, 10)).toBe(12)
      })
    })

    describe('Your data contains 60 items which you want to display at 5 items per page', () => {
      it('returns 12', () => {
        expect(Pagination.calculateTotalPages(60, 5)).toBe(12)
      })
    })

    describe('Your data contains 240 items which you want to display at 20 items per page', () => {
      it('returns 12', () => {
        expect(Pagination.calculateTotalPages(240, 20)).toBe(12)
      })
    })

    describe('Your data contains 121 items which you want to display at 10 items per page', () => {
      it('returns 13', () => {
        expect(Pagination.calculateTotalPages(121, 10)).toBe(13)
      })
    })

    describe('Your data contains 61 items which you want to display at 5 items per page', () => {
      it('returns 13', () => {
        expect(Pagination.calculateTotalPages(61, 5)).toBe(13)
      })
    })

    describe('Your data contains 241 items which you want to display at 20 items per page', () => {
      it('returns 13', () => {
        expect(Pagination.calculateTotalPages(241, 20)).toBe(13)
      })
    })
  })

  describe('`Pagination.calculatePageNumber()`', () => {
    describe('Min', () => {
      it('returns 1', () => {
        expect(Pagination.calculatePageNumber(0, 12)).toBe(1)
      })
    })

    describe('Max', () => {
      it('returns 12', () => {
        expect(Pagination.calculatePageNumber(13, 12)).toBe(12)
      })
    })
  })
})
