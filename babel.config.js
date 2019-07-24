module.exports = {
  compact: true,
  comments: false,
  presets: [
    [
      '@babel/env', {
        useBuiltIns: 'entry',
        targets: {
          node: 'current',
          browsers: [
            'last 2 versions'
          ]
        },
        corejs: '3'
      }
    ],
    '@babel/react'
  ],
  plugins: [
    '@babel/proposal-export-default-from',
    '@babel/proposal-export-namespace-from',
    [
      '@babel/proposal-class-properties',
      {
        loose: false
      }
    ],
    [
      'module-resolver', {
        alias: {
          'react-router-pagination': './src'
        }
      }
    ]
  ]
}
