const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const outputDirectory = './src/server/public/site';



var apiHost = "'http://localhost:5002'"



module.exports = {
  entry: ['babel-polyfill', './src/client/index.js'],
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: 'bundle.js'
  },
   optimization: {
     splitChunks: {
       chunks: 'all'
     }
   },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  resolve: {
    extensions: ['.html', '.js', '.jsx', '.css']
  },
  devServer: {
    //inline:false,
    port: 4000,
    open: true,
    proxy: {
      '/api': 'http://localhost:5002'
    },
    noInfo: true, // only errors & warns on hot reload
    disableHostCheck: true,
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: [outputDirectory]
    }),
    new HtmlWebpackPlugin({
      title: 'My page',
      inject: 'body',
      template: './public/index.html',
      favicon: './public/favicon.ico'
    }),
    new webpack.DefinePlugin({
      __API__: apiHost
    })
  ]
};