const path = require('path');
const slsw = require('serverless-webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const entry = Object.keys(slsw.lib.entries).reduce((entriesObject, key) => 
  ({
    ...entriesObject,
    [key]: ['./src/source-map-install.ts', slsw.lib.entries[key]]
  }), 
{});
const mode = slsw.lib.webpack.isLocal ? 'development' : 'production';

module.exports = {
  mode,
  entry,
  devtool: 'source-map',
  resolve: {
    extensions: [
      '.js', 
      '.jsx',
      '.json', 
      '.ts', 
      '.tsx'
    ],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.join(__dirname, 'tsconfig.json'),
      })
    ],
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
  },
  target: 'node',
  module: {
    rules: [
      { 
        loader: 'ts-loader', 
        test: /\.tsx?$/, 
      },
    ],
  },
};
