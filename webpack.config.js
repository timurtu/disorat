/**
 * Created by timur on 11/11/16.
 */

module.exports = {
  entry: {
    app: './src/client/app.js'
  },
  output: {
    path: './public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel?cacheDirectory']
      },
      {
        test: /\.scss$/,
        include: /node_modules|src/,
        loader: 'style!css!sass'
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  }
}
