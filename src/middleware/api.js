import { Schema, arrayOf, normalize } from 'normalizr'
import { camelizeKeys } from 'humps'
import 'isomorphic-fetch'

const userSchema = new Schema('users', { idAttribute: 'login' })
const repoSchema = new Schema('repos', { idAttribute: 'fullName' })
repoSchema.define({ owner: userSchema })

export const Schemas = {
  USER: userSchema,
  USER_ARRAY: arrayOf(userSchema),
  REPO: repoSchema,
  REPO_ARRAY: arrayOf(repoSchema)
}

export const CALL_API_SYMBOL = Symbol('Call API')

const callAPI = (endpoint, schema) => {
  const API_ROOT = 'https://api.github.com/'

  return fetch(API_ROOT + endpoint)
    .then(response =>
      response.json().then(json => ({ json, response }))
    )
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }

      return Object.assign({},
        normalize(camelizeKeys(json), schema)
      )
    })
}

export default (store) => (next) => (action) => {
  const apiAction = action[CALL_API_SYMBOL]
  if (typeof apiAction === 'undefined') {
    return next(action)
  }

  let { endpoint } = apiAction
  const { schema, types } = apiAction
  const [requestType, successType, failureType] = types
  next({ type: requestType })

  return callAPI(endpoint, schema).then(
    (response) => next({
      type: successType,
      response
    }),
    (error) => next({
      type: failureType,
      error: error.message || 'Oops!'
    })
  )
}
