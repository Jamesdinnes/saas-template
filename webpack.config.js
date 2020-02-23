const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const isDevelopment = process.argv.some(arg => arg.includes('development'));

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.[hash:12].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/,
        options: {
          emitWarning: true,
          typeCheck: false,
          configFile: './tslint.json',
          tsConfigFile: './tsconfig.json',
        },
      },
      {
        test: /\.module\.s(a|c)ss$/,
        loader: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: isDevelopment,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        loader: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
    ],
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve('./index.html'),
        filename: 'index.html',
        inject: 'body',
        minify: false,
        chunksSortMode: 'auto',
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new MiniCssExtractPlugin({
        filename: devMode ? '[name].css' : '[name].[hash].css',
        chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
      }),
      new BrowserSyncPlugin({
        host: 'localhost',
        port: 8000,
        proxy: 'http://localhost:8080/',
      }),
    ],
  },
};
