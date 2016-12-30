var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

const envPlugin = new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    'MOVIE_API_KEY': JSON.stringify(process.env.MOVIE_API_KEY)
  }
})

module.exports = {
  context: path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./client.js",
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        include : path.join(__dirname, 'src'),
        exclude : path.join(__dirname, 'node_modules')
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        }
      },
      {
        test: /\.css$/,
        loaders: [
          'style?sourceMap',
          'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
        ]
      },
      {
        test: /\.(png|jpg|gif)/,
        loader: 'file-loader?limit=8192'
      }
    ]
  },
  output: {
    path: __dirname + "/dist/",
    filename: "client.min.js",
    publicPath: '/'
  },
  plugins: debug
    ? [envPlugin]
    : [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ],
};
