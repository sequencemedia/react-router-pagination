import React from 'react'
import Pagination from 'react-router-pagination'

import withReactRouter from './with-react-router.js'

const TOTALPAGES = Pagination.calculateTotalPages(120, 10)
const PAGENUMBER = 1
const SPREAD = 5

function Component (props) {
  return (
    <Pagination
      {...props}
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
    totalPages: TOTALPAGES,
    pageNumber: PAGENUMBER,
    spread: SPREAD
  }
}
