const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const devMode = process.argv.some(arg => arg.includes('development'));

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: 'bundle.[hash:12].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/'
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
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
          tsConfigFile: './tsconfig.json'
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'sass-loader'
        ]
      },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('./index.html'),
      filename: 'index.html',
      inject: 'body',
      minify: false,
      chunksSortMode: 'auto'
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
      proxy: 'http://localhost:8080/'
    })
  ]
};
