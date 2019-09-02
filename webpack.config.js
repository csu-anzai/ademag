const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const outputDirectory = './src/server/public/site';
const apiUrl = 'http://localhost:5002'
const apiHost = `'${apiUrl}'`

module.exports = {
  entry: './src/client/index.js',
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: 'bundle.js'
  },
  performance: {
  hints: process.env.NODE_ENV === 'production' ? "warning" : false
  },
  //devtool: 'cheap-module-source-map',
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
  node: {
    __dirname: false,
  },
  resolve: {
    extensions: ['.html', '.js', '.jsx', '.css'],
    alias: {

    }
  },
  devServer: {
    //inline:false,
    //liveReload: true,
    port: 4000,
    open: true,
    proxy: {
      '/api': apiUrl // url serveur final deployé
    },
    noInfo: true, // only errors & warns on hot reload
    disableHostCheck: false,
    historyApiFallback: true, 
    contentBase: './', 
    hot: true,
    open: false
  },
  plugins: [
    //new BundleAnalyzerPlugin(),
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new webpack.DefinePlugin({
      __API__: apiHost
    }),
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: [outputDirectory]
    }),
    new HtmlWebpackPlugin({
      title: 'My page',
      inject: 'body',
      template: './public/index.html',
      favicon: './public/favicon.ico'
    })
  ]
}; 