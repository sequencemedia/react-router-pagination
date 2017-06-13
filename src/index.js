/* eslint react/prop-types: 0 */
import React from 'react'

import {
  Standard
} from './pagination/standard/standard'

import {
  Centered
} from './pagination/centered/centered'

export {
  pagination
} from './pagination/prototype/pagination'

export {
  Standard,
  Centered
}

export default ({ format, ...props }) => (
  format !== 'center'
    ? <Standard {...props} />
    : <Centered {...props} />
)
