import { combineReducers } from 'redux'
import counter from './counter'
import list from './list'

const rootReducer = combineReducers({
  counterList: list(counter)
})

export default rootReducer
