import React, { Fragment, useEffect, useReducer } from 'react'
import { ActivityIndicator, Button, View, Text } from 'react-native'

import Firebase from '../Firebase'
import Input from './Input'
import {
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  CLEAR_ERROR,
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  NOT_FOUND,
  ERROR_CODE,
} from '../constants'

const initialState = { email: '', isLoading: false, password: '', error: '' }

function reducer(state, action) {
  switch (action.type) {
    case CHANGE_EMAIL:
      return { ...state, email: action.text }
    case CHANGE_PASSWORD:
      return { ...state, password: action.text }
    case CLEAR_ERROR:
      return { ...state, error: '' }
    case SIGN_IN:
      return { ...state, isLoading: true }
    case SIGN_IN_ERROR:
      console.log('error', { action })

      return { ...state, error: action.error, isLoading: false }
    case SIGN_IN_SUCCESS:
      console.log('sign in success', {
        action,
        user: Firebase.auth().currentUser,
      })
      return { ...state, isLoading: false }
    case SIGN_UP:
      return { ...state, isLoading: true }
    case SIGN_UP_SUCCESS:
      console.log('sign up success', { action })
      return { ...state, isLoading: false }
    case SIGN_UP_ERROR:
      console.log('sign up error', { action })
      return { ...state, isLoading: false }
  }
}

const handleOnChangeText = (dispatch, type) => text => dispatch({ type, text })

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
    dispatch({ type: SIGN_IN_SUCCESS, payload: await payload })
  } catch (error) {
    handleSignInError({ dispatch, error })
  }
}

handleSignUpError = ({ dispatch, error }) => {
  console.log({ error })
  switch (error.code) {
    case ERROR_CODE[NOT_FOUND]:
      dispatch({
        type: SIGN_UP_ERROR,
        error: 'User is not found. Please Sign Up.',
      })
      break
    default:
      dispatch({
        type: SIGN_UP_ERROR,
        error: 'General Error',
      })
      break
  }
}

const handleSignUp = ({ dispatch, email, password }) => async () => {
  dispatch({ type: SIGN_UP })
  try {
    const payload = Firebase.auth().createUserWithEmailAndPassword(
      email,
      password
    )
    dispatch({ type: SIGN_UP_SUCCESS, payload: await payload })
  } catch (error) {
    handleSignUpError({ dispatch, error })
  }
}

const LoginForm = ({ signInState, title, toggleSign }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { email, error, isLoading, password } = state

  useEffect(() => {
    setTimeout(() => {
      dispatch({
        type: CLEAR_ERROR,
      })
    }, 4000)
  }, [error])

  const signProps = { dispatch, email, password }

  const handleButtonPress = signInState
    ? handleSignIn(signProps)
    : handleSignUp(signProps)

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

          <Button title={title} onPress={handleButtonPress} />

          <Text style={styles.toggle} onPress={toggleSign}>
            Sign In / Sign Up
          </Text>

          <Text style={styles.error}>{error}</Text>
        </Fragment>
      )}
    </View>
  )
}

const styles = {
  error: {
    color: 'red',
    margin: 10,
  },
  viewStyles: {
    alignItems: 'center',
    backgroundColor: 'white',
    height: 250,
    justifyContent: 'center',
  },
  toggle: {
    textDecorationLine: 'underline',
  },
}

export default LoginForm
