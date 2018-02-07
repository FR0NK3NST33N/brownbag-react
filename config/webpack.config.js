const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  entry: {
      'dist/app' : './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '..'),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      { 
          test: /\.js|\.jsx/, 
          use: [ 
            { 
                loader: 'babel-loader',
                options: {
                    presets: ['react']
                }
            }
          ]
      }, 
      {
          test: /\.css$/,
          use: [
              {
                  loader: 'style-loader'
              },
              {
                  loader: 'css-loader',
                  options: {
                    modules: true
                  }
              }
          ]
      },
      {
            test: /\.scss$/,
            exclude:  /node_modules/,
            use: [
                {
                    loader: "style-loader"
                },
                {
                    loader: "css-loader"
                },
                {
                    loader: "sass-loader"
                }
            ]
      },
      {
        test: /\.(png|jpe?g|gif|ico|svg)$/,
        use: 'url-loader?limit=1000000&name=assets/images/[name].[ext]'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("[name]")
  ],
  watch: true
};

module.exports = config;