import axios from 'axios'

import * as actionTypes from './actionTypes'

export const authStart = () => ({
  type: actionTypes.AUTH_START
})

export const authSuccess = (idToken, userId, refreshToken) => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken,
  userId,
  refreshToken,
})

export const authFail = (error) => ({
  type: actionTypes.AUTH_FAIL,
  error,
})

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('expirationDate')
  localStorage.removeItem('userId')
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, expirationTime * 1000)
  }
}

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart())
    const authData = {
      email,
      password,
      returnSecureToken: true,
    }
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBwCWfGqFtKCL8IyVUWrN9qd46GtNFz1L4'
    if (!isSignup) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBwCWfGqFtKCL8IyVUWrN9qd46GtNFz1L4'
    }
    axios.post(url, authData)
      .then(resp => {
        console.log(resp.data)
        const expirationDate = new Date(new Date().getTime() + resp.data.expiresIn * 1000)
        localStorage.setItem('token', resp.data.idToken)
        localStorage.setItem('expirationDate', expirationDate)
        localStorage.setItem('userId', resp.data.localId)
        dispatch(authSuccess(resp.data.idToken, resp.data.localId, resp.data.refreshToken))
        dispatch(checkAuthTimeout(resp.data.expiresIn))
      })
      .catch(err => {
        console.log(err)
        dispatch(authFail(err.response.data.error.message))
        // dispatch(authFail('fail'))
      })
  }
}

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path
  }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                console.log(userId)
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
};