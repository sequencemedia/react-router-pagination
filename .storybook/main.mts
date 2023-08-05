import type { StorybookConfig } from '@storybook/react-webpack5'

const MTS_RULE = {
  test: /\.mts?$/,
  use: {
    loader: 'babel-loader'
  },
  exclude: /node_modules/
}

const MTS_EXTENSION = '.mts'

const config: StorybookConfig = {
  stories: ['../**/*.stories.@(mjs|cjs|jsx|mts|tsx|cts)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links'
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
  webpackFinal (config) {
    const {
      module: {
        rules = []
      } = {},
      resolve: {
        extensions = []
      } = {}
    } = config

    rules.push(MTS_RULE)
    extensions.push(MTS_EXTENSION)

    return config
  }
}

export default config
