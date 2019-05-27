import React from 'react'
import PropTypes from 'prop-types'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import Pagination from 'react-router-pagination'

const TOTALPAGES = Pagination.calculateTotalPages(120, 10)
const SPREAD = 5

const PATH = '/:pageNumber(\\d+)'

const Home = ({ match, match: { params: { pageNumber = 1 } = {} } = {} } = {}) => (
  <section>
    <h1>
      Home
    </h1>

    <Pagination
      totalPages={TOTALPAGES}
      spread={SPREAD}
      onClick={action('click')}
      match={{
        path: PATH
      }}
    />
  </section>
)

Home.propTypes = {
  match: PropTypes.shape({})
}

const Page = ({ match, match: { params: { pageNumber = 1 } = {} } = {} } = {}) => (
  <section>
    <h1>
      Page {pageNumber}
    </h1>

    <Pagination
      totalPages={TOTALPAGES}
      pageNumber={Pagination.calculatePageNumber(pageNumber, TOTALPAGES)}
      spread={SPREAD}
      onClick={action('click')}
      match={match}
    />

    <Link to='/'>
      Home
    </Link>
  </section>
)

Page.propTypes = {
  match: PropTypes.shape({})
}

storiesOf('Pagination component', module)
  .add('With default props', () => (
    <Router>
      <Switch>
        <Route component={Page} exact path={PATH} />
        <Route component={Home} />
      </Switch>
    </Router>
  ))
