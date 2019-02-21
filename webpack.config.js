const path = require('path')
const webpack = require('webpack')
const dotenv = require('dotenv').config()

module.exports = env => {
  return {
    mode: 'production',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      publicPath: 'build/'
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              'presets': [
                '@babel/preset-env',
                '@babel/preset-react'
              ],
              'plugins': ['@babel/plugin-syntax-dynamic-import']
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(png|ttf)$/,
          use: [
            'file-loader'
          ]
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'env': JSON.stringify(dotenv.parsed)
      })
    ]
  }
}
