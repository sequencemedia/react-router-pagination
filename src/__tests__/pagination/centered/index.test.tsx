import React from 'react'
import renderer from 'react-test-renderer'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import {
  MemoryRouter
} from 'react-router-dom'

import {
  toInteger,
  calculateTotalPages,
  calculatePageNumber,
  Centered
} from 'react-router-pagination/pagination/centered'

Enzyme.configure({ adapter: new Adapter() })

describe('react-router-pagination/pagination/centered', () => {
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

  describe('<Centered />', () => {
    describe('With `pageNumber` and `totalPages`', () => {
      it('renders', () => {
        const component = (
          <MemoryRouter>
            <Centered
              pageNumber={1}
              totalPages={2}
            />
          </MemoryRouter>
        )

        return expect(renderer.create(component).toJSON())
          .toMatchSnapshot()
      })
    })

    describe('With `spread`', () => {
      it('renders', () => {
        const component = (
          <MemoryRouter>
            <Centered
              pageNumber={5}
              totalPages={9}
              spread={3}
            />
          </MemoryRouter>
        )

        return expect(renderer.create(component).toJSON())
          .toMatchSnapshot()
      })
    })
  })

  describe('`Centered.calculateTotalPages()`', () => {
    describe('Your data contains 120 items which you want to display at 10 items per page', () => {
      it('returns 12', () => {
        expect(Centered.calculateTotalPages(120, 10)).toBe(12)
      })
    })

    describe('Your data contains 60 items which you want to display at 5 items per page', () => {
      it('returns 12', () => {
        expect(Centered.calculateTotalPages(60, 5)).toBe(12)
      })
    })

    describe('Your data contains 240 items which you want to display at 20 items per page', () => {
      it('returns 12', () => {
        expect(Centered.calculateTotalPages(240, 20)).toBe(12)
      })
    })

    describe('Your data contains 121 items which you want to display at 10 items per page', () => {
      it('returns 13', () => {
        expect(Centered.calculateTotalPages(121, 10)).toBe(13)
      })
    })

    describe('Your data contains 61 items which you want to display at 5 items per page', () => {
      it('returns 13', () => {
        expect(Centered.calculateTotalPages(61, 5)).toBe(13)
      })
    })

    describe('Your data contains 241 items which you want to display at 20 items per page', () => {
      it('returns 13', () => {
        expect(Centered.calculateTotalPages(241, 20)).toBe(13)
      })
    })
  })

  describe('`Centered.calculatePageNumber()`', () => {
    describe('Min', () => {
      it('returns 1', () => {
        expect(Centered.calculatePageNumber(0, 12)).toBe(1)
      })
    })

    describe('Max', () => {
      it('returns 12', () => {
        expect(Centered.calculatePageNumber(13, 12)).toBe(12)
      })
    })
  })
})
