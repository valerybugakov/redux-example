import path from 'path'
import webpack from 'webpack'
import autoprefixer from 'autoprefixer'
import postcssNext from 'postcss-cssnext'
import postcssImport from 'postcss-import'
import HtmlPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const dev = process.env.NODE_ENV !== 'production'
const cssModuleName = dev ? '&localIdentName=[name]__[local]--[hash:base64:5]' : ''

const productionPlugins = [
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify('production') },
  }),
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false,
    },
  }),
]

let plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({ __DEBUG__: dev }),
  new HtmlPlugin({ inject: false, template: './index.html' }),
  new ExtractTextPlugin('style.[chunkhash].css', {
    disable: dev,
    allChunks: true,
  }),
]

if (!dev) plugins = plugins.concat(productionPlugins)

module.exports = {
  devtool: dev ? 'eval' : 'source-map',

  entry: dev ? {
    app: [
      'eventsource-polyfill', // necessary for hot reloading with IE
      'webpack-hot-middleware/client?path=/__webpack_hmr',
      './src/index',
    ],
  } : {
    app: './src/index.js',
  },

  output: {
    publicPath: '/',
    path: path.join(__dirname, 'dist'),
    filename: 'js/[name].[hash].js',
  },

  postcss: [
    postcssImport({
      addDependencyTo: webpack,
      path: [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'src/styles'),
      ],
    }),
    postcssNext(),
    autoprefixer({
      browsers: ['last 2 versions'],
    }),
  ],

  module: {
    loaders: [
      {
        test: /\.(jsx|js)?$/,
        exclude: /(node_modules|static|styles)/,
        loader: 'babel',
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style',
          `css?modules&importLoaders=1${cssModuleName}!postcss`
        ),
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        include: [
          path.resolve(__dirname, 'static'),
        ],
        loader: 'url-loader?limit=300000&name=[name].[ext]',
      },
    ],
  },

  resolve: {
    root: path.join(__dirname, 'src'),
    extensions: ['', '.js', '.html', '.css'],
    modulesDirectories: [
      'src',
      'node_modules',
    ],
  },

  plugins,

}
