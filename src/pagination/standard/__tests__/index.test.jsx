import React from 'react'

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
  Standard
} from '#pagination/pagination/standard'

describe('#pagination/pagination/standard', () => {
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

  describe('<Standard />', () => {
    describe('With `pageNumber` and `totalPages`', () => {
      it('renders', () => {
        expect(toSnapshot(render(
          <MemoryRouter>
            <Standard
              pageNumber={1}
              totalPages={2}
            />
          </MemoryRouter>
        )))
          .toMatchSnapshot()
      })

      describe('With `spread`', () => {
        it('renders', () => {
          expect(toSnapshot(render(
            <MemoryRouter>
              <Standard
                pageNumber={5}
                totalPages={9}
                spread={3}
              />
            </MemoryRouter>
          )))
            .toMatchSnapshot()
        })
      })
    })
  })

  describe('`Standard.calculateTotalPages()`', () => {
    describe('Your data contains 120 items which you want to display at 10 items per page', () => {
      it('returns 12', () => {
        expect(Standard.calculateTotalPages(120, 10)).toBe(12)
      })
    })

    describe('Your data contains 60 items which you want to display at 5 items per page', () => {
      it('returns 12', () => {
        expect(Standard.calculateTotalPages(60, 5)).toBe(12)
      })
    })

    describe('Your data contains 240 items which you want to display at 20 items per page', () => {
      it('returns 12', () => {
        expect(Standard.calculateTotalPages(240, 20)).toBe(12)
      })
    })

    describe('Your data contains 121 items which you want to display at 10 items per page', () => {
      it('returns 13', () => {
        expect(Standard.calculateTotalPages(121, 10)).toBe(13)
      })
    })

    describe('Your data contains 61 items which you want to display at 5 items per page', () => {
      it('returns 13', () => {
        expect(Standard.calculateTotalPages(61, 5)).toBe(13)
      })
    })

    describe('Your data contains 241 items which you want to display at 20 items per page', () => {
      it('returns 13', () => {
        expect(Standard.calculateTotalPages(241, 20)).toBe(13)
      })
    })
  })

  describe('`Standard.calculatePageNumber()`', () => {
    describe('Min', () => {
      it('returns 1', () => {
        expect(Standard.calculatePageNumber(0, 12)).toBe(1)
      })
    })

    describe('Max', () => {
      it('returns 12', () => {
        expect(Standard.calculatePageNumber(13, 12)).toBe(12)
      })
    })
  })
})
