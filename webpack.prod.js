const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const name = require('./package.json').name;
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { DefinePlugin } = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

console.log(process.env.NODE_ENV)

module.exports = merge(common, {
  mode:'production',
  optimization: {
    minimize: false,
    minimizer: [
      new TerserPlugin({
        extractComments: true,
        terserOptions: {
          sourceMap: true,
          compress: {
            drop_console: true
          }
        },
        test: /\.js(\?.*)?$/i
      }),
      new CssMinimizerPlugin({
        test: /\.css(\?.*)?$/i
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/' + name + '.[contenthash].min.css'
    }),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }) 
  ]
});
