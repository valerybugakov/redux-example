require('babel-register')

const path = require('path')
const express = require('express')
const webpack = require('webpack')
const config = require('./webpack.config')

const app = express()
const compiler = webpack(config)

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
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

app.use(require('webpack-hot-middleware')(compiler))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/app/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
  // next()
})

app.listen(3000, 'localhost', (err) => {
  if (err) {
    console.log(err)
    return
  }

  console.log('🔥 Listening at http://localhost:3000')
})
