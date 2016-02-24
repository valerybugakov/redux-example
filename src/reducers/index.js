import { combineReducers } from 'redux'
import counter from './counter'
import list from './list'
import { entities } from './github'

const rootReducer = combineReducers({
  counterList: list(counter),
  entities
})

export default rootReducer
