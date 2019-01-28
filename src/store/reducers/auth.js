import * as actionTypes from '../actions/actionTypes'
import {updateObj} from '../utility'

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/',
}

const authStart = (state, action) => {
  return updateObj(state, {error: null, loading: true})
}

const authSuccess = (state, action) => {
  return updateObj(state, {
    token: action.idToken,
    refreshToken: action.refreshToken,
    userId: action.userId,
    error: null,
    loading: false,
  })
}

const setAuthRedirectPath = (state, action) => (
  updateObj(state, {authRedirectPath: action.path})
) 

const authFail = (state, action) => updateObj(state, {error: action.error, loading: false})

const authLogout = (state, action) => updateObj(state, {token: null, userId: null})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: return authStart(state, action)
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action)
    case actionTypes.AUTH_FAIL: return authFail(state, action)
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action)
    case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action)
    default: return state
  }
}

export default reducer