// Fix for "emittingError: EMFILE: too many open files" caused by CopyWebpackPlugin
var fs = require('fs');
var gracefulFs = require('graceful-fs');
gracefulFs.gracefulify(fs);

const path = require('path');
const webpack = require('webpack');
const { CheckerPlugin } = require('awesome-typescript-loader');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const outputDirectory = 'dist';

module.exports = {

  resolveLoader: {
    alias: {
      "shopify-icons-loader": path.join(__dirname, "./config/webpack/SvgToJsonPlugin.js")
    }
  },

  devtool: 'source-map',

  entry: ['@babel/polyfill','./src/client/index.tsx'],

  output: {
    path: path.join(__dirname, outputDirectory),
    filename: 'bundle.js',
    //chunkFilename: '[id].js',
    publicPath: '/',
  },

  resolve: {
    modules: [
      path.join(__dirname, './src/client/'),
      'node_modules',
    ],
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    plugins: [
      new TsConfigPathsPlugin('./tsconfig.json'),
    ]
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new CleanWebpackPlugin([outputDirectory]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new CheckerPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/client/index.html',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: ['babel-loader?compact=false'],
      },
      {
        test: /\.tsx?$/,
        loader: 'babel-loader?compact=false!awesome-typescript-loader',
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              sourceMap: false,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
            }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [
                path.resolve('./node_modules/engage-ui/src/styles/'),
                path.resolve('./node_modules/engage-ui/src/styles/foundation'),
                path.resolve('./node_modules/engage-ui/src/themes/Delicious'),
              ],
              sourceMap: false
            }
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                './node_modules/engage-ui/src/styles/foundation.scss',
                './node_modules/engage-ui/themes/Delicious/foundation.scss',
                './node_modules/engage-ui/src/styles/shared.scss',
                './node_modules/engage-ui/themes/Delicious/shared.scss',
              ],
            },
          },
        ],
      },
      {
          test: /\.svg$/,
          use: [
            {
              loader: 'svg-react-loader',
            }
          ]
      },
      {
          test: /\.(jpe?g|png|gif)$/i,
          loaders: [
              'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
              'image-webpack-loader?bypassOnDebug=false'
          ]
      },
      // {
      //   test: /engage-ui+[/\\].+\.scss/,
      //   use: [
      //     {
      //       loader: 'style-loader',
      //     },
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         localIdentName: '[name]__builder2__[local]__[hash:base64:5]',
      //         modules: true,
      //         importLoaders: 1,
      //         sourceMap: false,
      //       }
      //     },
      //     {
      //       loader: 'postcss-loader'
      //     },
      //     {
      //       loader: 'sass-loader',
      //     },
      //     {
      //       loader: 'sass-resources-loader',
      //     },
      //   ]
      // },
    ],
  },

  externals: {
    react: 'React',
    "react-dom": "ReactDOM",
  },

  devServer: {
    host: 'localhost',
    port: '4000',
    historyApiFallback: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    hot: true,
    inline: true,
    stats: 'errors-only',
    // proxy: {
    //   "/builder": "http://localhost:8080"
    // }
  },
};
