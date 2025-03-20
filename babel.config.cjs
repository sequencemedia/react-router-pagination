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
    '@babel/env',
    {
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
  ],
  '@babel/react',
  '@babel/typescript'
]

const plugins = [
  '@babel/syntax-jsx',
  [
    'module-resolver', {
      alias: {
        '#pagination/pagination/component': './src/pagination/component.tsx',
        '#pagination/super/pagination/component': './src/super/pagination/component.tsx'
      }
    }
  ]
]

// @ts-ignore
module.exports = (api) => {
  if (api) api.cache.using(env)

  return {
    presets,
    plugins,
    ignore: [
      /node_modules\/(?!react-component-instance)\//,
      /node_modules\/(?!react-component-snapshot)\//,
      /node_modules\/(?!react-component-name)\//
    ]
  }
}
