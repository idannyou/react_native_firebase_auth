import React, { Fragment, useReducer } from 'react'
import { ActivityIndicator, Button, View, Text } from 'react-native'

import Firebase from '../Firebase'

import Input from './Input'

const CHANGE_EMAIL = 'CHANGE_EMAIL'
const CHANGE_PASSWORD = 'CHANGE_PASSWORD'

const SIGN_IN = 'SIGN_IN'
const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS'
const SIGN_IN_ERROR = 'SIGN_IN_ERROR'

const SIGN_UP = 'SIGN_UP'

const initialState = { email: '', isLoading: false, password: '', error: '' }

function reducer(state, action) {
  switch (action.type) {
    case CHANGE_EMAIL:
      return { ...state, email: action.text }
    case CHANGE_PASSWORD:
      return { ...state, password: action.text }
    case SIGN_IN:
      return { ...state, isLoading: true }
    case SIGN_IN_ERROR:
      console.log('error', { action })
      return { ...state, error: action.error, isLoading: false }
    case SIGN_IN_SUCCESS:
      console.log('success', { action })
      return { ...state, isLoading: false }
    case SIGN_UP:
      return { ...state }
  }
}

const handleOnChangeText = (dispatch, type) => text => dispatch({ type, text })

const NOT_FOUND = 'NOT_FOUND'
const ERROR_CODE = {
  [NOT_FOUND]: 'auth/user-not-found',
}

handleSignInError = ({ dispatch, error }) => {
  switch (error.code) {
    case ERROR_CODE[NOT_FOUND]:
      dispatch({
        type: SIGN_IN_ERROR,
        error: 'User is not found. Please Sign Up.',
      })
      break
    default:
      dispatch({
        type: SIGN_IN_ERROR,
        error: 'General Error',
      })
      break
  }
}

const handleSignIn = ({ dispatch, email, password }) => async () => {
  dispatch({ type: SIGN_IN })
  try {
    const payload = Firebase.auth().signInWithEmailAndPassword(email, password)
    handleSignIn({ dispatch, payload: await payload })
  } catch (error) {
    handleSignInError({ dispatch, error })
  }
}

const LoginForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { email, error, isLoading, password } = state

  return (
    <View style={styles.viewStyles}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Fragment>
          <Input
            label="Email"
            placeholder="user@email.com"
            value={email}
            secureTextEntry={false}
            onChangeText={handleOnChangeText(dispatch, CHANGE_EMAIL)}
          />
          <Input
            label="Password"
            placeholder="password"
            value={password}
            secureTextEntry={true}
            onChangeText={handleOnChangeText(dispatch, CHANGE_PASSWORD)}
          />

          <Button
            title="Sign in"
            onPress={handleSignIn({ dispatch, email, password })}
          />

          <Text>{error}</Text>
        </Fragment>
      )}
    </View>
  )
}

const styles = {
  viewStyles: {
    backgroundColor: '#f8f8f8',
    height: 250,
    justifyContent: 'center',
  },
}

export default LoginForm
