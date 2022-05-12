const { merge } = require('webpack-merge');

const common = require('./webpack.common');

module.exports = merge(common, {
  output: {
    filename: '[name].js',
  },
  watchOptions: {
    ignored: ['node_modules/**'],
    aggregateTimeout: 600,
  },
  devtool: 'cheap-module-source-map',
  performance: {},
});
