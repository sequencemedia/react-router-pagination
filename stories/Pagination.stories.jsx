import React from 'react'
import { action } from '@storybook/addon-actions'

import Pagination from 'react-router-pagination'

import withReactRouter from './with-react-router.jsx'

const TOTALPAGES = Pagination.calculateTotalPages(120, 10)
const PAGENUMBER = 1
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
    totalPages: TOTALPAGES,
    pageNumber: PAGENUMBER,
    spread: SPREAD
  }
}
