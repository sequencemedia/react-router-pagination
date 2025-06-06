const MTS_RULE = {
  test: /\.mts?$/,
  use: {
    loader: 'babel-loader'
  },
  exclude: /node_modules/
}

const MTS_EXTENSION = '.mts'

const config = {
  stories: ['../**/*.stories.@(mjs|cjs|jsx|mts|tsx|cts)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-webpack5-compiler-babel',
    '@chromatic-com/storybook',
    '@storybook/addon-docs'
  ],

  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },

  docs: {},

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
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript'
  }
}

export default config
