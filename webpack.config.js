const webpack = require('webpack');

module.exports = {
  entry: './assets/build.js',
  output: {
    path: __dirname + '/public/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['env'],
        },
      },
    ],
  },
};
