import React, { useReducer } from 'react'
import { View, Button } from 'react-native'

import Firebase from '../Firebase'

import Input from './Input'

const CHANGE_EMAIL = 'CHANGE_EMAIL'
const CHANGE_PASSWORD = 'CHANGE_PASSWORD'

const SIGN_IN = 'SIGN_IN'
const SIGN_UP = 'SIGN_UP'

const initialState = { email: '', password: '' }

function reducer(state, action) {
  switch (action.type) {
    case CHANGE_EMAIL:
      return { ...state, email: action.text }
    case CHANGE_PASSWORD:
      return { ...state, password: action.text }
    case SIGN_IN:
      const { email, password } = state

      try {
        Firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        console.log(e)
      }

      return { ...state }
    case SIGN_UP:
      return { ...state }
  }
}

const dispatchAction = (dispatch, type) => text => dispatch({ type, text })

const LoginForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { email, password } = state
  return (
    <View>
      <Input
        label="Email"
        placeholder="user@email.com"
        value={email}
        secureTextEntry={false}
        onChangeText={dispatchAction(dispatch, CHANGE_EMAIL)}
      />
      <Input
        label="Password"
        placeholder="password"
        value={password}
        secureTextEntry={true}
        onChangeText={dispatchAction(dispatch, CHANGE_PASSWORD)}
      />

      <Button title="Sign in" onPress={dispatchAction(dispatch, SIGN_IN)} />
    </View>
  )
}

export default LoginForm
