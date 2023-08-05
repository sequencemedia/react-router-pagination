import React from 'react'
import {
  MemoryRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

export default function withReactRouter (Story) {
  return (
    <Router>
      <Routes>
        <Route element={<Story />} path="*" />
      </Routes>
    </Router>
  )
}
