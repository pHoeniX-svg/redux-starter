const path = require('path');

module.exports = {
  devtool: 'source-map', // generates .js.map source map and .js bundle
  entry: './src/index.ts',
  output: {
    // publicPath: "public", // not needed so far
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        include: [path.resolve(__dirname, 'src')],
      },
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        use: ['source-map-loader'], // use this to load .js.map source maps
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    hot: true,
    liveReload: false,
    open: true,
    port: 3000,
  },
  // mode: 'development',
};
