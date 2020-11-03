import {
  toInteger,
  calculateTotalPages,
  calculatePageNumber
} from 'react-router-pagination/pagination/common'

describe('react-router-pagination/pagination/common', () => {
  describe('`toInteger()`', () => {
    describe('A number', () => {
      it('returns a number', () => {
        expect(toInteger(1)).toBe(1)
      })
    })

    describe('A string representing a number', () => {
      it('returns a number', () => {
        expect(toInteger('1')).toBe(1)
      })
    })

    describe('A string', () => {
      it('returns a number', () => {
        expect(toInteger('A')).toBe(0)
      })
    })
  })

  describe('`calculateTotalPages()`', () => {
    describe('Your data contains 120 items which you want to display at 10 items per page', () => {
      it('returns 12', () => {
        expect(calculateTotalPages(120, 10)).toBe(12)
      })
    })

    describe('Your data contains 60 items which you want to display at 5 items per page', () => {
      it('returns 12', () => {
        expect(calculateTotalPages(60, 5)).toBe(12)
      })
    })

    describe('Your data contains 240 items which you want to display at 20 items per page', () => {
      it('returns 12', () => {
        expect(calculateTotalPages(240, 20)).toBe(12)
      })
    })

    describe('Your data contains 121 items which you want to display at 10 items per page', () => {
      it('returns 13', () => {
        expect(calculateTotalPages(121, 10)).toBe(13)
      })
    })

    describe('Your data contains 61 items which you want to display at 5 items per page', () => {
      it('returns 13', () => {
        expect(calculateTotalPages(61, 5)).toBe(13)
      })
    })

    describe('Your data contains 241 items which you want to display at 20 items per page', () => {
      it('returns 13', () => {
        expect(calculateTotalPages(241, 20)).toBe(13)
      })
    })
  })

  describe('`calculatePageNumber()`', () => {
    describe('Min', () => {
      it('returns 1', () => {
        expect(calculatePageNumber(0, 12)).toBe(1)
      })
    })

    describe('Max', () => {
      it('returns 12', () => {
        expect(calculatePageNumber(13, 12)).toBe(12)
      })
    })
  })
})
