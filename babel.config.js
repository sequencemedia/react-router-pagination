module.exports = {
  compact: true,
  comments: false,
  presets: [
    [
      '@babel/typescript', {
        allExtensions: true
      }
    ],
    [
      '@babel/env', {
        useBuiltIns: 'usage',
        targets: {
          node: '12.9.0',
          browsers: [
            'last 2 versions'
          ]
        },
        corejs: 3
      }
    ],
    '@babel/react'
  ],
  plugins: [
    '@babel/transform-typescript',
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
