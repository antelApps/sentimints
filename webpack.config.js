const HtmlWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/views/index.html',
  filename: 'index.html',
  inject: 'body'
});

export {
  entry: [
    './server/App.js'
  ],
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist'
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader', 'react-hot'] }
    ]
  },
  plugins: [HTMLWebpackPluginConfig]
}