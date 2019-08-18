const merge = require('webpack-merge')

/**
 *  Webpack Dev Server doesn't appear to support the
 *  parameters Webpack Dev Server says it should. Is
 *  Storybook using a superceded version?
 */
module.exports = async ({ config }) => {
  return merge(config, {
    devServer: {
      setup: function (app) {
        app.get('/:pageNumber', function (req, res) {
          res.redirect('/iframe.html')
        })
      },

      historyApiFallback: true /*
      historyApiFallback: {
        rewrites: [
          { from: /^\d*$/, to: 'index.html' }
        ]
      } */
    }
  })
}
