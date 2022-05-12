const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: './src/App.tsx',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash:6].js',
    clean: true,
  },

  optimization: {
    usedExports: true,
  },

  performance: {
    hints: 'warning',
  },

  devServer: {
    static: './dist',
    compress: true,
    hot: true,
    client: {
      progress: true,
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    historyApiFallback: { index: '/', disableDotRule: true },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
      filename: 'index.html',
    }),
    new InterpolateHtmlPlugin({
      PUBLIC_URL: 'public',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          to: path.resolve(__dirname, 'dist', 'public'),
        },
      ],
    }),
    new WebpackManifestPlugin({}),
    new NodePolyfillPlugin(),
    new CompressionPlugin(),
  ],

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    fallback: {
      tls: false,
      net: false,
      fs: false,
    },
  },

  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        // this loader will handle svg file in react component
        test: /\.svg$/,
        loader: 'svg-url-loader',
      },
    ],
  },
};
