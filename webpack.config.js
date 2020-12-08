const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: [
        './src/index.tsx'
    ],
    output: {
        filename: 'build.js',
        path: resolve(__dirname, 'dist'), 
        publicPath: '/'
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    devServer: {
        port: '8081',
        hot: true,
        noInfo: false,
        quiet: false,
        contentBase: resolve(__dirname, 'public'),
        publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)?$/, 
          use: [
              {
                  loader: 'ts-loader',
                  options: {
                      transpileOnly: true,
                      compilerOptions: {
                        module: 'es2015'
                      }
                  },
              }, 
          ],
          exclude: [resolve(__dirname, "node_modules")],
        },
        { test: /\.txt$/, use: 'raw-loader' }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({template: 'public/index.html'})
    ]
};