//webpack.config.js
const path = require('path')

module.exports = [
  {
    mode: 'production',
    devtool: 'hidden-source-map',
    entry: {
      main: './src/default.ts'
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'index.js',
      scriptType: 'text/javascript',
      library: {
        type: 'var',
        name: 'br'
      }
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
  },
  {
    mode: 'production',
    devtool: 'hidden-source-map',
    entry: {
      main: './src/index.ts'
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'index.esm.js',
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
]
