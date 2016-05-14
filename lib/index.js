import React from 'react'

import { pagination } from './pagination/prototype/pagination'
import { Standard } from './pagination/standard/standard'
import { Centered } from './pagination/centered/centered'

export { pagination, Standard, Centered }

export default (props) => (
  props.format !== 'center'
    ? <Standard {...props} />
    : <Centered {...props} />
)
