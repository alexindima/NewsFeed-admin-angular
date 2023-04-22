const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.ts'],
    fallback: {
      "crypto": false,
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // look for .ts files
        use: 'ts-loader' // use ts-loader to compile TypeScript files
      }
    ]
  }
};
