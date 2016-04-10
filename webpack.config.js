var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/client/public/index.html',
  filename: 'index.html',
  inject: 'body'
});
module.exports = {
  entry: [
    './client/components/app.jsx',
    './client/public/style.css'
  ],
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist'
  },

  module: {
    loaders: [
      { 
        test: /\.jsx?$/, 
        loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015'],
        exclude: /node_modules/
      },
      { 
        test: /\.css$/, 
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        // include: path.resolve(__dirname, '/client/public')
      }
    ]
  },
  plugins: [HTMLWebpackPluginConfig, new ExtractTextPlugin(__dirname + "/dist/bundle.css")]
}