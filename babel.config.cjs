const debug = require('debug')

const log = debug('react-router-pagination')

const {
  env: {
    NODE_ENV = 'development'
  }
} = process

log('`react-router-pagination` is awake')

function env () {
  log({ NODE_ENV })

  return (
    NODE_ENV === 'production'
  )
}

const presets = [
  [
    '@babel/env', {
      targets: {
        node: 'current',
        browsers: [
          'last 4 versions',
          'safari >= 9',
          'ios >= 8',
          'ie >= 9',
          '> 2%'
        ]
      },
      useBuiltIns: 'usage',
      corejs: 3
    }
  ]
]

const plugins = [
  [
    'module-resolver',
    {
      alias: {
        '#pagination/centered': './src/pagination/centered/index.tsx',
        '#pagination/standard': './src/pagination/standard/index.tsx',
        '#pagination/component': './src/pagination/component.tsx',
        '#pagination/index': './src/pagination/index.tsx'
      }
    }
  ]
]

module.exports = (api) => {
  if (api) api.cache.using(env)

  return {
    presets,
    plugins
  }
}
