import React from 'react'

import { action } from 'storybook/actions'

import Pagination from '#pagination'

import withReactRouter from './with-react-router.jsx'

const PAGENUMBER = 1
const TOTALPAGES = Pagination.calculateTotalPages(120, 10)
const SPREAD = 5

function Component (props) {
  return (
    <Pagination
      {...props}
      onChange={action('onChange')}
    />
  )
}

export default {
  title: 'Components/Pagination',
  component: Component,
  decorators: [
    withReactRouter
  ],
  argTypes: {
    totalPages: {
      control: 'number',
      min: 1,
      max: TOTALPAGES,
      step: 1
    },
    pageNumber: {
      control: 'number',
      min: 1,
      max: TOTALPAGES,
      step: 1
    },
    spread: {
      control: {
        type: 'number',
        min: 1,
        max: TOTALPAGES,
        step: 1
      }
    }
  }
}

export const ComponentStory = {
  args: {
    pageNumber: PAGENUMBER,
    totalPages: TOTALPAGES,
    spread: SPREAD
  }
}
