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
  describe('<Pagination format=\'standard\' />', () => {
    describe('With `pageNumber` and `totalPages`', () => {
      it('renders', () => {
        expect(toSnapshot(render(
          <MemoryRouter>
            <Pagination
              format='standard'
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
              format='standard'
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

  describe('<Pagination format=\'centered\' />', () => {
    describe('With `pageNumber` and `totalPages`', () => {
      it('renders', () => {
        expect(toSnapshot(render(
          <MemoryRouter>
            <Pagination
              format='centered'
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
              format='centered'
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
