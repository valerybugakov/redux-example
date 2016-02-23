import React from 'react'
import { render } from 'react-dom'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import io from 'socket.io-client'

const socket = io()
socket.emit('message', 'hello world')

socket.on('initState', (state) => {

  console.log(`initState event: ${ JSON.stringify(state)}`)
  const store = configureStore({ counterList: state })

  render(
    <Root store={store} />,
    document.getElementById('root')
  )

})

// const store = configureStore({ counterList: [{ value: 1 }] })
//
// render(
//   <Root store={store} />,
//   document.getElementById('root')
// )
