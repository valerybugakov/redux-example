export function entities(state = { users: {}, repos: {} }, action) {
  if (action.response && action.response.entities) {
    return Object.assign({}, state, action.response.entities)
  }
  return state
}
