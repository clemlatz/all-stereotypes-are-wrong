const webpack = require('webpack');

process.traceDeprecation = true;

module.exports = {
  entry: './client/client.js',
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
