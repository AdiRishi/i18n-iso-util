import path from 'path';
import webpack from 'webpack';

const config: webpack.Configuration = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    clean: true,
    library: {
      name: 'i18nIsoUtil',
      type: 'umd',
    },
    // globalObject is set to 'self' by default which does not work in Node.js environments
    globalObject: 'this',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [{ test: /\.tsx?$/, loader: 'ts-loader' }],
  },
};

export default config;
