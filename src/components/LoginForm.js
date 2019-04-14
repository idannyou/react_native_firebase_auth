import React, { useReducer } from 'react'
import { View, Button, Text } from 'react-native'

import Firebase from '../Firebase'

import Input from './Input'

const CHANGE_EMAIL = 'CHANGE_EMAIL'
const CHANGE_PASSWORD = 'CHANGE_PASSWORD'

const SIGN_IN = 'SIGN_IN'
const SIGN_IN_ERROR = 'SIGN_IN_ERROR'

const SIGN_UP = 'SIGN_UP'

const initialState = { email: '', password: '', error: '' }

function reducer(state, action) {
  switch (action.type) {
    case CHANGE_EMAIL:
      return { ...state, email: action.text }
    case CHANGE_PASSWORD:
      return { ...state, password: action.text }
    case SIGN_IN:
      return { ...state }
    case SIGN_IN_ERROR:
      console.log('error', { action })
      return { ...state, error: action.error }
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
  console.log(error)
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
  try {
    const payload = Firebase.auth().signInWithEmailAndPassword(email, password)
    const resolvedPayload = await payload
    console.log({ dispatch, email, password, resolvedPayload })
  } catch (error) {
    handleSignInError({ dispatch, error })
  }
}

const LoginForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { email, error, password } = state
  return (
    <View>
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
    </View>
  )
}

export default LoginForm
