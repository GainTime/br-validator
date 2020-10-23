//webpack.config.js
const path = require('path')

module.exports = {
  mode: 'development',
  devtool: 'hidden-source-map',
  entry: {
    main: './src/index.ts'
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      }
    ]
  }
}
