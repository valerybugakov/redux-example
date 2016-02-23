import { CALL_API_SYMBOL, Schemas } from 'middleware/api'

export const USER_REQUEST = 'USER_REQUEST'
export const USER_SUCCESS = 'USER_SUCCESS'
export const USER_FAILURE = 'USER_FAILURE'

function fetchUser(username) {
  return {
    [CALL_API_SYMBOL]: {
      types: [ USER_REQUEST, USER_SUCCESS, USER_FAILURE ],
      endpoint: `users/${username}`,
      schema: Schemas.User
    }
  }
}

export function loadUser(username) {
  return (dispatch, getState) => {
    const user = getState().entities.users[username]
    if (user) {
      return null
    }

    return dispatch(fetchUser(username))
  }
}
