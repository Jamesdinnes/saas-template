const webpack = require('webpack');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const isDevelopment = process.argv.some(arg => arg.includes('development'));

const configPlugins = [
  new HtmlWebpackPlugin({
    template: path.resolve('./index.html'),
  }),
  new webpack.NoEmitOnErrorsPlugin(),
  new MiniCssExtractPlugin({
    filename: isDevelopment ? '[name].css' : '[name].[hash].css',
    chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css',
  }),
  new CompressionPlugin(),
  new ImageminWebpWebpackPlugin(),
  new OptimizeCSSAssetsPlugin({
    cssProcessorOptions: {
      map: {
        inline: false,
        annotation: true,
      },
      safe: true,
      discardComments: true,
    },
  }),
  new ManifestPlugin(),
  new Dotenv(),
  ...(isDevelopment && [
    new webpack.HotModuleReplacementPlugin(),
    new BundleAnalyzerPlugin(),
    new DashboardPlugin(),
  ]),
  new webpack.NamedModulesPlugin(),
];

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index.tsx',
  ],
  output: {
    filename: '[name].[hash:12].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    open: true,
    hot: true,
    port: 3000,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  stats: {
    colors: false,
    hash: true,
    timings: true,
    assets: true,
    chunks: true,
    chunkModules: true,
    modules: true,
    children: true,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\\.s(a|c)ss$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(j|t)s(x)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            babelrc: false,
            presets: [
              [
                '@babel/preset-env',
                { targets: { browsers: 'last 2 versions' } }, // or whatever your project requires
              ],
              '@babel/preset-typescript',
              '@babel/preset-react',
            ],
            plugins: ['react-hot-loader/babel'],
          },
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
  },
  plugins: configPlugins,
};
