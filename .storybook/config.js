import { configure } from '@storybook/react'

function loadStories () {
  console.log(require('../stories'))
}

configure(loadStories, module)
