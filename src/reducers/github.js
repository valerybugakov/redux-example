import * as ActionTypes from 'actions/github'
import { combineReducers } from 'redux'
import merge from 'lodash/merge'
import paginate from './paginate'

export function entities(state = { users: {}, repos: {} }, action) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }
  return state
}

export const pagination = combineReducers({
  reposByUser: paginate({
    getIdAttribute: action => action.username,
    types: [
      ActionTypes.USER_REPOS_REQUEST,
      ActionTypes.USER_REPOS_SUCCESS,
      ActionTypes.USER_REPOS_FAILURE,
    ],
  }),
})
