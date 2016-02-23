export const CALL_API = Symbol('Call API')

export default store => next => action => {
  console.log(JSON.stringify(action))
  next(action)
}
