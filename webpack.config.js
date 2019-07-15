const TerserPlugin = require('terser-webpack-plugin')
const LodashPlugin = require('lodash-webpack-plugin')
const WebpackBar   = require('webpackbar')
const path         = require('path')
const merge        = require('webpack-merge')
const { name }     = require('./package.json')

const isProduction = process.env.NODE_ENV === 'production'
const config       = {
  entry : './src/index.js',
  mode  : process.env.NODE_ENV,
  output: {
    filename     : 'escpos-builder.js',
    path         : path.resolve(__dirname, 'dist'),
    library      : name,
    libraryTarget: 'commonjs2',
  },
  externals: { 'mutable-buffer': 'mutable-buffer' },
  module   : {
    rules: [
      {
        test   : /\.js$/,
        exclude: /node_modules/,
        loader : 'babel-loader',
      },
    ],
  },
  plugins: [new WebpackBar({ profile: true })],
}

let output

if (isProduction) {
  output = merge(config, {
    plugins     : [new LodashPlugin()],
    optimization: {
      minimize : true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            ecma    : 6,
            compress: true,
            mangle  : true,
            output  : {
              comments: false,
              beautify: false,
            },
          },
        }),
      ],
    },
  })
} else {
  output = merge(config, {
    devtool  : 'inline-source-map',
    devServer: { port: 8888, contentBase: ['./dist'] },
  })
}

module.exports = output
