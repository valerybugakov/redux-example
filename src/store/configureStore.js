import { createStore, applyMiddleware, compose } from 'redux'
// import thunk from 'redux-thunk'
// import createLogger from 'redux-logger'
// import api from '../middleware/api'
import rootReducer from '../reducers'
// import DevTools from '../containers/DevTools'

const configureStore = (initialState) => {
  const store = createStore(
    rootReducer,
    initialState,
    // compose(
    //   applyMiddleware(thunk, api, createLogger()),
    //   DevTools.instrument()
    // )
  )

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

export default configureStore
