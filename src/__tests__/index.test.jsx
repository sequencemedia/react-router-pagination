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

import Pagination from '#pagination'

describe('#pagination', () => {
  describe('<Pagination />', () => {
    describe('With `pageNumber` and `totalPages`', () => {
      it('renders', () => {
        expect(toSnapshot(render(
          <MemoryRouter>
            <Pagination
              pageNumber={1}
              totalPages={2}
            />
          </MemoryRouter>
        )))
          .toMatchSnapshot()
      })
    })

    describe('With `pageNumber` and `totalPages` and `spread`', () => {
      it('renders', () => {
        expect(toSnapshot(render(
          <MemoryRouter>
            <Pagination
              pageNumber={9}
              totalPages={9}
              spread={3}
            />
          </MemoryRouter>
        )))
          .toMatchSnapshot()
      })
    })
  })

  describe('<Pagination format=\'center\' />', () => {
    describe('With `pageNumber` and `totalPages`', () => {
      it('renders', () => {
        expect(toSnapshot(render(
          <MemoryRouter>
            <Pagination
              format='center'
              pageNumber={1}
              totalPages={2}
            />
          </MemoryRouter>
        )))
          .toMatchSnapshot()
      })
    })

    describe('With `pageNumber` and `totalPages` and `spread`', () => {
      it('renders', () => {
        expect(toSnapshot(render(
          <MemoryRouter>
            <Pagination
              format='center'
              pageNumber={9}
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
