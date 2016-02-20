require('babel-register')

const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const history = require('connect-history-api-fallback')
const config = require('./webpack.config.babel')

const app = express()
const compiler = webpack(config)

app.use(express.static(path.join(__dirname, '/static')))
app.use(history())

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  noInfo: true,
  publicPath: config.output.publicPath,
  historyApiFallback: true,
  stats: {
    hash: false,
    colors: true,
    timings: true,
    chunks: true,
    assets: false,
    version: false,
    children: false,
    chunkModules: false,
  },
}))

app.use(webpackHotMiddleware(compiler))

app.listen(3000, 'localhost', (err) => {
  if (err) {
    console.log(err)
    return
  }

  console.log('🔥 Listening at http://localhost:3000')
})
