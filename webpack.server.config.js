const fs = require('fs')
const path = require('path')

const nodeModules = {}

fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {

  entry: './src/server.js',
  output: {
    path: path.resolve('./dist/js/server'),
    filename: 'server.js',
    chunkFilename: '[id].server.js'
  },
  target: 'node',
  externals: nodeModules,
  node: {
    __filename: false,
    __dirname: false
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
          plugins: ['syntax-dynamic-import']
        }
      }
    ]
  }

}
