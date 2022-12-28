const path = require('path'),
  BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  target: 'node',
  entry: './src/app.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        // include: [path.resolve(__dirname, 'src')],
        exclude: /node_modules/,
        use: 'ts-loader',
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new BundleAnalyzerPlugin()
  ]
};
