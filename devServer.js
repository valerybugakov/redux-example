/* eslint-disable vars-on-top, no-var */
require('babel-register')

const path = require('path')
const express = require('express')
const http = require('http')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const history = require('connect-history-api-fallback')
const config = require('./webpack.config.babel')

const app = express()
const server = http.Server(app)
const io = require('socket.io')(server)
const compiler = webpack(config)
const port = process.env.PORT || 3000

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

var connections = []
var userId = 0

io.on('connection', socket => {
  // var counters = [{ value: 1 }, { value: 2 }, { value: 3 }]
  connections.push(socket)
  userId += 1

  socket.emit('start', { userId })

  socket.on('message', (msg) => {
    console.log(`message: ${msg}`)
  })

  socket.on('disconnect', () => {
    var index = connections.indexOf(socket)
    connections.splice(index, 1)
  })
})

server.listen(port, 'localhost', (err) => {
  if (err) {
    console.log(err)
    return
  }

  console.log(`🔥 Listening at http://localhost:${port}`)
})
