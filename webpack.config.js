const path = require('path')

module.exports = {
  entry: './src/main.jsx',
  output: {
    path: path.resolve('./dist/js/'),
    publicPath: '/js/',
    filename: 'website.js',
    chunkFilename: '[id].website.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [['es2015', { modules: false }], 'react']
        }
      }
    ]
  }
}
