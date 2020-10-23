//webpack.config.js
const path = require('path')

module.exports = {
  mode: 'production',
  devtool: 'hidden-source-map',
  entry: {
    main: './src/index.ts'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
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
