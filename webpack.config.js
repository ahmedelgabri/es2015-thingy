const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: './build/js/bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.json']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.json$/,
        loaders: [ 'json' ]
      },
      {
        test: /\.css/,
        loader: ExtractTextPlugin.extract('css-loader')
      }
    ]
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    new ExtractTextPlugin('./build/css/app.css', { allChunks: true })
  ],
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ]
}
