import { CALL_API_SYMBOL, Schemas } from 'middleware/api'

export const USER_REQUEST = 'USER_REQUEST'
export const USER_SUCCESS = 'USER_SUCCESS'
export const USER_FAILURE = 'USER_FAILURE'

function fetchUser(username) {
  return {
    [CALL_API_SYMBOL]: {
      types: [USER_REQUEST, USER_SUCCESS, USER_FAILURE],
      endpoint: `users/${username}`,
      schema: Schemas.USER
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

export const USER_REPOS_REQUEST = 'USER_REPOS_REQUEST'
export const USER_REPOS_SUCCESS = 'USER_REPOS_SUCCESS'
export const USER_REPOS_FAILURE = 'USER_REPOS_FAILURE'

function fetchRepos(username, nextPageUrl) {
  return {
    username,
    [CALL_API_SYMBOL]: {
      types: [USER_REPOS_REQUEST, USER_REPOS_SUCCESS, USER_REPOS_FAILURE],
      endpoint: nextPageUrl,
      schema: Schemas.REPO_ARRAY

    }
  }
}

export function loadRepos(username, nextPage) {
  return (dispatch, getState) => {
    const {
      nextPageUrl = `users/${username}/repos`,
      pageCount = 0
    } = getState().pagination.reposByUser[username] || {}

    if (pageCount > 0 && !nextPage) {
      return null
    }

    return dispatch(fetchRepos(username, nextPageUrl))
  }
}
