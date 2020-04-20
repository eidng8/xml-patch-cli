/*
 * GPLv3 https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 * Author: eidng8
 */

const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.ts',
  },
  output: {
    path: path.resolve(__dirname, 'bin'),
    filename: '[name].js',
    libraryTarget: 'commonjs',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
      },
    ],
  },
};
