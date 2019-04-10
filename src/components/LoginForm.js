import React, { useReducer } from 'react'
import { View, Button } from 'react-native'

import Input from './Input'

const CHANGE_EMAIL = 'CHANGE_EMAIL'
const CHANGE_PASSWORD = 'CHANGE_PASSWORD'

const initialState = { email: '', password: '' }

function reducer(state, action) {
  switch (action.type) {
    case CHANGE_EMAIL:
      return { ...state, email: action.text }
    case CHANGE_PASSWORD:
      return { ...state, password: action.text }
  }
}

const handleOnChangeText = (dispatch, type) => text => dispatch({ type, text })

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
        onPress={() => console.log({ email, password })}
      />
    </View>
  )
}

export default LoginForm
